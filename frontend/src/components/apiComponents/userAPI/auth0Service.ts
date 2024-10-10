export class Auth0Service {
    private domain: string;
    private clientId: string;
    private clientSecret: string;
    private audience: string;

    constructor() {
        this.domain = 'https://dev-juzu8hcucbv4naz4.us.auth0.com';
        this.clientId = process.env.AUTH0_MANAGEMENT_CLIENT_ID!;
        this.clientSecret = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!;
        this.audience = `${this.domain}/api/v2/`;
    }

    async getAccessToken(): Promise<string> {
        console.log('Attempting to get access token...');
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
            console.error('Token response not OK:', response.status, errorText);
            throw new Error(`Failed to get access token: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Access token obtained successfully');
        return data.access_token;
    }

    async fetchFromAuth0(endpoint: string, accessToken: string): Promise<any> {
        const response = await fetch(`${this.domain}/api/v2/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Not found');
            }
            throw new Error(`Failed to fetch from Auth0: ${response.status}`);
        }

        return response.json();
    }
}