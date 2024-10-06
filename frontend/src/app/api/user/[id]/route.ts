// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;

  try {
    console.log(`Attempting to get access token for user ID: ${userId}`);
    const tokenResponse = await fetch('https://dev-juzu8hcucbv4naz4.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: "https://dev-juzu8hcucbv4naz4.us.auth0.com/api/v2/",
        grant_type: "client_credentials"
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token response not OK:', tokenResponse.status, errorText);
      throw new Error(`Failed to get access token: ${tokenResponse.status} ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    console.log('Access token obtained successfully');
    const accessToken = tokenData.access_token;

    // Fetch specific user using the access token
    const userResponse = await fetch(`https://dev-juzu8hcucbv4naz4.us.auth0.com/api/v2/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      throw new Error('Failed to fetch user');
    }

    const user = await userResponse.json();
    return NextResponse.json(user);
  } catch (error) {
    console.error(`Detailed error in /api/user/${userId}:`, error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}