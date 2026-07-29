const defaultGoogleTagManagerId = "GTM-MSM8MPD6";
const configuredGoogleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

export const googleTagManagerId =
  configuredGoogleTagManagerId && /^GTM-[A-Z0-9]+$/i.test(configuredGoogleTagManagerId)
    ? configuredGoogleTagManagerId
    : defaultGoogleTagManagerId;
