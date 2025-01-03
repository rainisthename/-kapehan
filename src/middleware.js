import { NextResponse } from 'next/server';
import { parse } from 'cookie';  // Import cookie parsing utility

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // If the request is for a route under /auth/
  if (pathname.startsWith('/auth')) {
    // Get cookies from the request headers (use 'cookie' header)
    const cookies = parse(req.headers.get('cookie') || '');  // Parse cookies from the request
    const token = cookies.loginToken; // Change 'auth_token' to 'jwt' as that's the name of your token

    // If there's no token and the user is trying to access /auth (login page)
    if (!token && pathname === '/auth') {
      console.log('No token found, staying on /auth');
      return NextResponse.next();  // Allow the user to stay on the login page
    }

    // If there's a token and the user is visiting /auth (login page), redirect to /auth/dashboard
    if (token && pathname === '/auth') {
      console.log('Token found, redirecting to /auth/dashboard');
      return NextResponse.redirect(new URL('/auth/dashboard', req.url));  // Redirect to dashboard
    }

    // If there's no token and the user is trying to access any other /auth page, redirect to /auth
    if (!token && pathname !== '/auth') {
      console.log('No token found, redirecting to /auth');
      return NextResponse.redirect(new URL('/auth', req.url));  // Redirect to login page
    }
  }

  // If the route is not under /auth/ or the token is valid, allow the request to proceed
  return NextResponse.next();
}
