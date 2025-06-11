import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './lib/config/locales';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'id',
});

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const allowedPaths = ['/', '/id', '/en'];
  const isValid = allowedPaths.some((path) => pathname.startsWith(path));

  if (!isValid) {
    return NextResponse.redirect(new URL('/id', req.url));

    // Atau jika ingin ke 404, gunakan ini:
    // return NextResponse.rewrite(new URL("/404", req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!_next|api|static|favicon.ico).*)'],
};
