import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const pathname = request.nextUrl.pathname;

  if (
    session &&
    (pathname.startsWith('/login') || pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!session && pathname.startsWith('/write')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/board')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth/login`, {
  //   headers: {
  //     Cookie: `session=${session?.value}`,
  //   },
  // });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
