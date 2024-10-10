// export class Auth0Service {
//     private domain: string;
//     private clientId: string;
//     private clientSecret: string;
//     private audience: string;

//     constructor() {
//         this.domain = 'https://dev-juzu8hcucbv4naz4.us.auth0.com';
//         this.clientId = process.env.AUTH0_MANAGEMENT_CLIENT_ID!;
//         this.clientSecret = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!;
//         this.audience = `${this.domain}/api/v2/`;
//     }

//     async getAccessToken(): Promise<string> {
//         console.log('Attempting to get access token...');
//         const response = await fetch(`${this.domain}/oauth/token`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 client_id: this.clientId,
//                 client_secret: this.clientSecret,
//                 audience: this.audience,
//                 grant_type: "client_credentials"
//             }),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Token response not OK:', response.status, errorText);
//             throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
//         }

//         const data = await response.json();
//         console.log('Access token obtained successfully');
//         return data.access_token;
//     }

//     async fetchFromAuth0(endpoint: string, accessToken: string): Promise<any> {
//         const response = await fetch(`${this.domain}/api/v2/${endpoint}`, {
//             headers: { 'Authorization': `Bearer ${accessToken}` },
//         });

//         if (!response.ok) {
//             if (response.status === 404) {
//                 throw new Error('Not found');
//             }
//             throw new Error(`Failed to fetch from Auth0: ${response.status}`);
//         }

//         return response.json();
//     }
// }

export class Auth0Service {
    private domain: string;
    private clientId: string;
    private clientSecret: string;
    private audience: string;
    private accessToken: string | null = null;
    private tokenExpirationTime: number = 0;

    constructor() {
        this.domain = 'https://dev-juzu8hcucbv4naz4.us.auth0.com';
        this.clientId = process.env.AUTH0_MANAGEMENT_CLIENT_ID!;
        this.clientSecret = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!;
        this.audience = `${this.domain}/api/v2/`;
    }

    private async refreshAccessToken(): Promise<void> {
        console.log('Refreshing access token...');
        const response = await fetch(`${this.domain}/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: "client_credentials"
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Token refresh failed:', response.status, errorText);
            throw new Error(`Failed to refresh access token: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpirationTime = Date.now() + (data.expires_in * 1000);
        console.log('Access token refreshed successfully');
    }

    async getAccessToken(): Promise<string> {
        if (!this.accessToken || Date.now() >= this.tokenExpirationTime) {
            await this.refreshAccessToken();
        }
        return this.accessToken!;
    }

    async fetchFromAuth0(endpoint: string): Promise<any> {
        try {
            const accessToken = await this.getAccessToken();
            const response = await fetch(`${this.domain}/api/v2/${endpoint}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
            });

            if (response.status === 401) {
                // Token might have expired, try to refresh and retry the request
                await this.refreshAccessToken();
                const retryResponse = await fetch(`${this.domain}/api/v2/${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${this.accessToken}` },
                });

                if (!retryResponse.ok) {
                    throw new Error(`Failed to fetch from Auth0 after token refresh: ${retryResponse.status}`);
                }

                return retryResponse.json();
            }

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Not found');
                }
                throw new Error(`Failed to fetch from Auth0: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            console.error('Error in fetchFromAuth0:', error);
            throw error;
        }
    }
}