import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PAGE_ENDPOINTS } from './constants/constants';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // "/"만 입력했을 경우 "/news/home"으로 리다이렉트
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL(PAGE_ENDPOINTS.NEWS.HOME, req.url));
  }

  // 패스가 "/news" or "/news/" 일 경우 "/news/home"으로 리다이렉트
  const regex = /^\/news\/?$/;
  if (regex.test(url.pathname)) {
    return NextResponse.redirect(new URL(PAGE_ENDPOINTS.NEWS.HOME, req.url));
  }
}
