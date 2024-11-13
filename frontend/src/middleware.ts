import { NextResponse } from 'next/server';
 import {decodeJwt, jwtVerify} from 'jose';

export async function middleware(request: Request) {
    const { pathname } = new URL(request.url);

    // Skip authentication for /api/auth routes
    if (pathname.startsWith('/api/auth')) {
        return NextResponse.next(); // Bypass token verification
    }

    // Check for /api/accesstoken route and validate API key
    if (pathname.startsWith('/api/accesstoken')) {

        const apiKey = request.headers.get('accesstokenapikey');
        console.log(apiKey)
        if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_ACCESS_TOKEN_API_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized: Invalid or missing API key' },
                { status: 401 }
            );
        }

        return NextResponse.next(); // Allow access if API key is valid
    }

    // Apply token verification for other /api/* paths
    if (pathname.startsWith('/api/')) {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Access token is required' },
                { status: 401 }
            );
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        try {
            const decoded = decodeJwt(token);
            console.log(decoded)
            if (decoded.iss === process.env.AUTH0_ISSUER_BASE_URL) {
                return NextResponse.next();
            }
        } catch (error) {
            return NextResponse.json(
                { error: 'Invalid or expired access token' },
                { status: 403 }
            );
        }
    }

    return NextResponse.next(); // Continue with the request
}

export const config = {
    matcher: ['/api/:path*'], // Apply middleware only to API routes
};
