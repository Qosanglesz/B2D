import { NextResponse } from 'next/server';
import { decodeJwt } from 'jose';
import { getSession } from '@auth0/nextjs-auth0/edge';
import path from 'path';

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const timestamp = new Date().toISOString();  // Get the current time in ISO format


  // Define allowed paths and static resource patterns
  const allowedPages = ["/", "/home", "/campaign", "/about", "/contact"];
  const allowedAPIs = ["/api/payment/webhook", "/api/payment/coinbase/webhook", "/api/uploadthing"];
  const isStaticResource = pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos') ||
    pathname.endsWith('.css') ||
    pathname.endsWith('.js') ||
    pathname.endsWith('._darcs') ||
    pathname.endsWith('.hg') ||
    pathname.endsWith('.bzr') ||
    pathname.startsWith('/BitKeeper') ||
    pathname.startsWith('/latest/meta-data/');

  // Allow requests to static resources
  if (isStaticResource) {
    return NextResponse.next();
  }

  // Handle non-API routes (public pages, authenticated pages, and admin pages)
  if (!pathname.startsWith('/api/')) {
    try {
      
      const session = await getSession();

      // Allow access to paths in allowedPages
      if (allowedPages.includes(pathname)) {
        return NextResponse.next();
      }

      // Redirect unauthenticated users to login page for other paths
      if (!session) {
        console.log(`[${timestamp}] Unauthenticated access attempt on: ${pathname}`);
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`));
      }
      console.log(`[${timestamp}][${session?.user.sub}] Request made to: ${pathname}`);

      const roles = session.user['https://localhost:3000/roles'] || [];

      // Restrict access to "/admin" paths to users with the "Admin B2D" role
      if (pathname.startsWith("/admin") && !roles.includes("Admin B2D")) {
        console.log(`[${timestamp}] Access denied for user with sub: ${session.user.sub} on admin page: ${pathname}`);
        return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/home`));
      }

    } catch (error) {
      console.error(`[${timestamp}] Error retrieving session or decoding JWT`);
      return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`));
    }

    return NextResponse.next();
  }

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    // Allow public access to `/api/auth` routes
    if (pathname.startsWith('/api/auth') || allowedAPIs.includes(pathname)) {
      console.log(`[${timestamp}] Public API route accessed: ${pathname}`);
      return NextResponse.next();
    }

    // Validate API key for `/api/accesstoken` route
    if (pathname.startsWith('/api/accesstoken')) {
      const apiKey = request.headers.get('accesstokenapikey');
      if (apiKey !== process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY) {
        console.error(`[${timestamp}] Unauthorized access attempt on: ${pathname} with invalid API key`);
        return NextResponse.json({ error: 'Unauthorized: Invalid or missing API key' }, { status: 401 });
      }
      return NextResponse.next();
    }

    // Validate Authorization header for other API routes
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      console.error(`[${timestamp}] Access token missing for API route: ${pathname}`);
      return NextResponse.json({ error: 'Access token is required' }, { status: 401 });
    }

    // Validate access token issuer and audience
    try {
      const decoded = decodeJwt(token);
      if (decoded.iss === process.env.AUTH0_ISSUER_BASE_URL && decoded.aud === process.env.AUTH0_CLIENT_ID) {
        console.log(`[${timestamp}] Access token valid for user with sub: ${decoded.sub} for API route: ${pathname}`);
        return NextResponse.next();
      }
    } catch (error) {
      console.error(`[${timestamp}] Invalid or expired access token for API route: ${pathname}`);
      return NextResponse.json({ error: 'Invalid or expired access token' }, { status: 403 });
    }
  }

  // Set secure HTTP headers
  const response = NextResponse.next();

  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self';");
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');

  return response;
}

export const config = {
  matcher: ['/:path*'],
};
