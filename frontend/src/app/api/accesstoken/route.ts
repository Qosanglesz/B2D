import { NextRequest, NextResponse } from 'next/server';

let cachedToken: {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
    expiresAt: number;

     } | null = null;

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Check if cached token exists and is still valid
        const now = Date.now() / 1000; // Get current time in seconds
        if (cachedToken && cachedToken.expiresAt > now) {
            // Return cached token if it's still valid
            return NextResponse.json(cachedToken);
        }

        // Requesting the Auth0 token if cached token is expired or not available
        const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
                client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
                audience: process.env.AUTH0_AUDIENCE,
                grant_type: "client_credentials"
            })
        });

        // If the request fails, throw an error
        if (!response.ok) {
            throw new Error(`Failed to fetch token: ${response.statusText}`);
        }

        // Parse the JSON response to extract the token
        const data = await response.json();

        // Save the new token and its expiration time
        cachedToken = {
            access_token: data.access_token,
            scope: data.scope,
            expires_in: data.expires_in,
            token_type: data.token_type,
            expiresAt: Date.now() / 1000 + data.expires_in - 60 // Set expiration time (subtract 60 seconds for buffer)
        };

        // Return the new token as a JSON response
        return NextResponse.json(data);
    } catch (error) {
        // Handle any errors that occurred during the request
        return NextResponse.json({ error }, { status: 500 });
    }
}
