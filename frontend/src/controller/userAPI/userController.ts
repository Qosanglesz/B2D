import {NextResponse} from 'next/server';
import {Auth0Service} from './auth0Service';


export class UserController {
    private auth0Service: Auth0Service;

    constructor() {
        this.auth0Service = new Auth0Service();
    }

    async getUsers(userId?: string): Promise<NextResponse> {
        try {
            const endpoint = userId ? `users/${userId}` : 'users';
            const userData = await this.auth0Service.fetchFromAuth0(endpoint);
            return NextResponse.json(userData);
        } catch (error) {
            console.error(`Detailed error in getUsers${userId ? ` for ${userId}` : ''}:`, error);

            if (error instanceof Error) {
                if (error.message === 'Not found') {
                    return NextResponse.json({error: 'User not found'}, {status: 404});
                } else if (error.message.includes('Failed to fetch from Auth0')) {
                    return NextResponse.json({error: 'Auth0 Service Error', details: error.message}, {status: 503});
                }
            }

            return NextResponse.json({
                error: 'Internal Server Error',
                details: (error as Error).message
            }, {status: 500});
        }
    }

    async patchUserData(newData: object, user_id: string): Promise<NextResponse> {
        try {
            const res = await this.auth0Service.patchUserData(newData, user_id);  // Await the service response
            return NextResponse.json({
                message: "User successfully patched",
                data: res
            });
        } catch (err) {
            console.error(`Cannot patch user: ${err}`);
            return NextResponse.json({error: 'Failed to patch user'}, {status: 500});
        }
    }
}
