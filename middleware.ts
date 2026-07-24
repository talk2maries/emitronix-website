import { NextRequest, NextResponse } from "next/server";
import { isArabicPath } from "@/lib/i18n";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

type RedirectEntry = { from: string; to: string; permanent: boolean };

const CACHE_TTL_MS = 30 * 1000;
const ARABIC_NOT_FOUND_ROUTE = "/ar/emitronix-route-not-found";
const INTERNAL_NOT_FOUND_HEADER = "x-emitronix-internal-not-found";

let cache: { at: number; map: Map<string, RedirectEntry> } | null = null;

function nextWithLocaleHeaders(request: NextRequest, status?: number) {
  const response = NextResponse.next(status ? { status } : undefined);
  response.headers.set(
    "Content-Language",
    isArabicPath(request.nextUrl.pathname) ? "ar-AE" : "en-AE",
  );
  return response;
}

function rewriteToBrandedNotFound(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(INTERNAL_NOT_FOUND_HEADER, "1");

  const destination = request.nextUrl.clone();
  destination.pathname = isArabicPath(request.nextUrl.pathname)
    ? ARABIC_NOT_FOUND_ROUTE
    : "/__emitronix-route-not-found";
  destination.search = "";

  const response = NextResponse.rewrite(destination, {
    status: 404,
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set(
    "Content-Language",
    isArabicPath(request.nextUrl.pathname) ? "ar-AE" : "en-AE",
  );
  return response;
}

async function loadRedirects(request: NextRequest): Promise<Map<string, RedirectEntry>> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.map;

  const map = new Map<string, RedirectEntry>();
  try {
    const origin = process.env.INTERNAL_ORIGIN || request.nextUrl.origin;
    const response = await fetch(`${origin}/api/redirects/export`, { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as { redirects?: RedirectEntry[] };
      for (const entry of data.redirects ?? []) {
        if (entry?.from && entry?.to) map.set(entry.from, entry);
      }
    }
  } catch {
    // On failure keep an empty map; retry after TTL.
  }
  cache = { at: Date.now(), map };
  return map;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/+$/, "") || "/";

  // A same-origin rewrite passes through middleware again in production.
  // Render the private Arabic destination once while preserving the outer 404.
  if (
    pathname === ARABIC_NOT_FOUND_ROUTE &&
    request.headers.get(INTERNAL_NOT_FOUND_HEADER) === "1"
  ) {
    return nextWithLocaleHeaders(request, 404);
  }

  const redirects = await loadRedirects(request);
  const entry = redirects.get(pathname);
  if (entry) {
    try {
      const destination = entry.to.startsWith("http") ? entry.to : new URL(entry.to, request.url);
      return NextResponse.redirect(destination, entry.permanent ? 301 : 302);
    } catch {
      // Ignore malformed administrator data instead of surfacing a runtime error.
    }
  }

  if (isUnknownClosedSetPath(pathname)) {
    return rewriteToBrandedNotFound(request);
  }

  return nextWithLocaleHeaders(request);
}

export const config = {
  // Arabic misses must be localized even when the public URL has a file-like
  // suffix. The general matcher still skips real static assets, APIs and admin.
  matcher: [
    "/ar/:path*",
    "/((?!_next/|api/|admin|favicon|images/|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
