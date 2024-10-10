import { NextResponse } from 'next/server';
import { Auth0Service } from './auth0Service';

export class UserController {
    private auth0Service: Auth0Service;

    constructor() {
        this.auth0Service = new Auth0Service();
    }

    async getUsers(userId?: string): Promise<NextResponse> {
        try {
            const accessToken = await this.auth0Service.getAccessToken();
            const endpoint = userId ? `users/${userId}` : 'users';
            const userData = await this.auth0Service.fetchFromAuth0(endpoint, accessToken);
            return NextResponse.json(userData);
        } catch (error) {
            console.error(`Detailed error in getUsers${userId ? ` for ${userId}` : ''}:`, error);
            if ((error as Error).message === 'Not found') {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }
            return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 });
        }
    }
}