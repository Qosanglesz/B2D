import {NextResponse} from 'next/server';
import {decodeJwt} from 'jose';
import {getSession} from "@auth0/nextjs-auth0/edge";

export async function middleware(request: Request) {
    const {pathname} = new URL(request.url);

    // Define allowed paths and static resource patterns
    const allowedPages = ["/", "/home", "/campaign", "/about", "/contact"];
    const allowedAPIs = ["/api/payment/webhook", "/api/payment/coinbase/webhook", "/api/uploadthing"]
    const isStaticResource = pathname.startsWith('/_next') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/videos') ||
        pathname.endsWith('.css') ||
        pathname.endsWith('.js');

    // Allow requests to static resources
    if (isStaticResource) return NextResponse.next();

    // Handle non-API routes (public pages, authenticated pages, and admin pages)
    if (!pathname.startsWith('/api/')) {
        try {

            const session = await getSession();

            // Allow access to paths in allowedPages
            if (allowedPages.includes(pathname)) {
                return NextResponse.next()
            }

            // Redirect unauthenticated users to login page for other paths
            if (!session) {
                return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`));
            }
            const roles = session.user['https://localhost:3000/roles'] || [];

            // Restrict access to "/admin" paths to users with the "Admin B2D" role
            if (pathname.startsWith("/admin") && !roles.includes("Admin B2D")) {
                return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/home`));
            }

        } catch (error) {
            console.error("Error retrieving session or decoding JWT:", error);
            return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`));
        }

        return NextResponse.next();
    }

    // Handle API routes
    if (pathname.startsWith('/api/')) {
        // Allow public access to `/api/auth` routes
        if (pathname.startsWith('/api/auth') || allowedAPIs.includes(pathname)) {
            return NextResponse.next()
        }

        // Validate API key for `/api/accessToken` route
        if (pathname.startsWith('/api/accesstoken')) {
            const apiKey = request.headers.get('accesstokenapikey');
            if (apiKey !== process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY) {
                return NextResponse.json({error: 'Unauthorized: Invalid or missing API key'}, {status: 401});
            }
            return NextResponse.next();
        }

        // Validate Authorization header for other API routes
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({error: 'Access token is required'}, {status: 401});
        }

        // Validate access token issuer
        try {
            const decoded = decodeJwt(token);
            if (decoded.iss === process.env.AUTH0_ISSUER_BASE_URL) return NextResponse.next();
        } catch (error) {
            console.error("Error decoding access token:", error);
            return NextResponse.json({error: 'Invalid or expired access token'}, {status: 403});
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};
