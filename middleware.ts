import { NextRequest, NextResponse } from "next/server";
import { isUnknownClosedSetPath } from "@/lib/routeAccessPolicy";

type RedirectEntry = { from: string; to: string; permanent: boolean };

const CACHE_TTL_MS = 30 * 1000;

let cache: { at: number; map: Map<string, RedirectEntry> } | null = null;

function nextWithLocaleHeaders(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-emitronix-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function rewriteToBrandedNotFound(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-emitronix-pathname", request.nextUrl.pathname);

  const destination = request.nextUrl.clone();
  destination.pathname = "/__emitronix-route-not-found";
  destination.search = "";

  return NextResponse.rewrite(destination, {
    request: {
      headers: requestHeaders,
    },
  });
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
  // Skip static assets, API routes and the admin area itself.
  matcher: ["/((?!_next/|api/|admin|favicon|images/|.*\\.[a-zA-Z0-9]+$).*)"],
};
