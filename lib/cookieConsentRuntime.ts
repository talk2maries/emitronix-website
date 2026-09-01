export type RuntimeConsentCategories = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  performance: boolean;
};

export type RevokedConsentCategories = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  performance: boolean;
  any: boolean;
};

export type SalesIqCookieCategory = "analytics" | "performance";

export type SalesIqRuntimePrivacy = {
  essentialChat: true;
  visitorTracking: boolean;
  cookieConsent: SalesIqCookieCategory[];
};

type ApplyConsentTransitionOptions<TCategories extends RuntimeConsentCategories> = {
  previousCategories: TCategories | null;
  nextCategories: TCategories;
  clearAllOptionalState?: boolean;
  prepareRevocation: (
    revoked: RevokedConsentCategories,
    nextCategories: TCategories,
  ) => void;
  updateConsent: (categories: TCategories) => void;
  persistConsent: () => void;
  clearRevokedState: (
    revoked: RevokedConsentCategories,
    nextCategories: TCategories,
  ) => void;
  loadGrantedScripts: (categories: TCategories) => void;
  scheduleReload: () => void;
};

type ScheduleConsentReloadOptions = {
  schedule: (callback: () => void, delayMs: number) => void;
  reload: () => void;
  delayMs?: number;
};

export function getRevokedConsentCategories(
  previousCategories: RuntimeConsentCategories | null,
  nextCategories: RuntimeConsentCategories,
): RevokedConsentCategories {
  const analytics = Boolean(previousCategories?.analytics && !nextCategories.analytics);
  const marketing = Boolean(previousCategories?.marketing && !nextCategories.marketing);
  const functional = Boolean(previousCategories?.functional && !nextCategories.functional);
  const performance = Boolean(previousCategories?.performance && !nextCategories.performance);

  return {
    analytics,
    marketing,
    functional,
    performance,
    any: analytics || marketing || functional || performance,
  };
}

export function getSalesIqRuntimePrivacy(
  categories: RuntimeConsentCategories,
): SalesIqRuntimePrivacy {
  const cookieConsent: SalesIqCookieCategory[] = [];
  if (categories.analytics) cookieConsent.push("analytics");
  if (categories.performance) cookieConsent.push("performance");

  return {
    essentialChat: true,
    visitorTracking: categories.analytics,
    cookieConsent,
  };
}

export function applyConsentTransition<TCategories extends RuntimeConsentCategories>({
  previousCategories,
  nextCategories,
  clearAllOptionalState = false,
  prepareRevocation,
  updateConsent,
  persistConsent,
  clearRevokedState,
  loadGrantedScripts,
  scheduleReload,
}: ApplyConsentTransitionOptions<TCategories>) {
  const revoked = getRevokedConsentCategories(previousCategories, nextCategories);
  const errors: unknown[] = [];
  const cleanupCategories = clearAllOptionalState
    ? {
        analytics: true,
        marketing: true,
        functional: true,
        performance: true,
        any: true,
      }
    : revoked;

  if (revoked.any) {
    // Install any short-lived transport/provider guards before the denied
    // command so no lifecycle event can escape during the transition.
    try {
      prepareRevocation(revoked, nextCategories);
    } catch (error) {
      errors.push(error);
    }
  }

  // Apply the new Consent Mode state before persistence, cleanup or navigation
  // can trigger page lifecycle events using the previous granted state.
  let consentUpdated = false;
  try {
    updateConsent(nextCategories);
    consentUpdated = true;
  } catch (error) {
    errors.push(error);
  }

  try {
    persistConsent();
  } catch (error) {
    errors.push(error);
  }

  if (cleanupCategories.any) {
    try {
      clearRevokedState(cleanupCategories, nextCategories);
    } catch (error) {
      errors.push(error);
    }
  }

  if (revoked.any) {
    try {
      scheduleReload();
      return {
        reloadScheduled: true,
        consentUpdated,
        revoked,
        cleanupCategories,
        errors,
      };
    } catch (error) {
      errors.push(error);
      return {
        reloadScheduled: false,
        consentUpdated,
        revoked,
        cleanupCategories,
        errors,
      };
    }
  }

  if (consentUpdated) {
    try {
      loadGrantedScripts(nextCategories);
    } catch (error) {
      errors.push(error);
    }
  }

  return {
    reloadScheduled: false,
    consentUpdated,
    revoked,
    cleanupCategories,
    errors,
  };
}

export function shouldBlockRevokedTrackingRequest({
  input,
  pageUrl,
  revoked,
  revokedExtraScriptUrls = [],
}: {
  input: string | URL;
  pageUrl: string;
  revoked: RevokedConsentCategories;
  revokedExtraScriptUrls?: string[];
}) {
  let url: URL;
  try {
    url = new URL(String(input), pageUrl);
  } catch {
    return false;
  }

  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname.toLowerCase();
  const hostnameMatches = (expected: string) =>
    hostname === expected || hostname.endsWith(`.${expected}`);
  const googleConsentRevoked =
    revoked.analytics || revoked.marketing || revoked.functional;

  if (
    googleConsentRevoked &&
    (hostnameMatches("google-analytics.com") ||
      (hostnameMatches("google.com") && pathname.endsWith("/g/collect")))
  ) {
    return true;
  }

  if (
    revoked.marketing &&
    [
      "doubleclick.net",
      "googleadservices.com",
      "googlesyndication.com",
      "facebook.com",
      "licdn.com",
      "linkedin.com",
    ].some(hostnameMatches)
  ) {
    return true;
  }

  if (
    (revoked.analytics || revoked.performance) &&
    ["clarity.ms", "hotjar.com", "hotjar.io"].some(hostnameMatches)
  ) {
    return true;
  }

  return revokedExtraScriptUrls.some((configuredUrl) => {
    try {
      return new URL(configuredUrl).hostname.toLowerCase() === hostname;
    } catch {
      return false;
    }
  });
}

export function scheduleReloadAfterConsentUpdate({
  schedule,
  reload,
  delayMs = 0,
}: ScheduleConsentReloadOptions) {
  let reloaded = false;
  const reloadOnce = () => {
    if (reloaded) return;
    reloaded = true;
    reload();
  };

  // The caller invokes this only after the denied update, persistence, and
  // provider cleanup complete synchronously. Avoid a custom dataLayer event:
  // broadly configured GTM tags could treat it as an analytics trigger.
  schedule(reloadOnce, delayMs);
}
