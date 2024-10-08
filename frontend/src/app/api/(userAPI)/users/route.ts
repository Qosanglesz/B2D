// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Attempting to get access token...');
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

    // Fetch users using the access token
    const usersResponse = await fetch('https://dev-juzu8hcucbv4naz4.us.auth0.com/api/v2/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!usersResponse.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await usersResponse.json();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Detailed error in /api/users:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
  }
}