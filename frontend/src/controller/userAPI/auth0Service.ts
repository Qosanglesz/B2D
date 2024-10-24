// export class Auth0Service {
//     private domain: string;
//     private clientId: string;
//     private clientSecret: string;
//     private audience: string;
//     private accessToken: string | null = null;
//     private tokenExpirationTime: number = 0;

//     constructor() {
//         this.domain = 'https://dev-juzu8hcucbv4naz4.us.auth0.com';
//         this.clientId = process.env.AUTH0_MANAGEMENT_CLIENT_ID!;
//         this.clientSecret = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET!;
//         this.audience = `${this.domain}/api/v2/`;
//     }

//     private async refreshAccessToken(): Promise<void> {
//         console.log('Refreshing access token...');
//         const response = await fetch(`${this.domain}/oauth/token`, {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 client_id: this.clientId,
//                 client_secret: this.clientSecret,
//                 audience: this.audience,
//                 grant_type: "client_credentials"
//             }),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Token refresh failed:', response.status, errorText);
//             throw new Error(`Failed to refresh access token: ${response.status} ${errorText}`);
//         }

//         const data = await response.json();
//         this.accessToken = data.access_token;
//         this.tokenExpirationTime = Date.now() + (data.expires_in * 1000);
//         console.log('Access token refreshed successfully');
//     }

//     async getAccessToken(): Promise<string> {
//         if (!this.accessToken || Date.now() >= this.tokenExpirationTime) {
//             await this.refreshAccessToken();
//         }
//         return this.accessToken!;
//     }

//     async fetchFromAuth0(endpoint: string): Promise<any> {
//         try {
//             const accessToken = await this.getAccessToken();
//             const response = await fetch(`${this.domain}/api/v2/${endpoint}`, {
//                 headers: {'Authorization': `Bearer ${accessToken}`},
//             });

//             if (response.status === 401) {
//                 // Token might have expired, try to refresh and retry the request
//                 await this.refreshAccessToken();
//                 const retryResponse = await fetch(`${this.domain}/api/v2/${endpoint}`, {
//                     headers: {'Authorization': `Bearer ${this.accessToken}`},
//                 });

//                 if (!retryResponse.ok) {
//                     throw new Error(`Failed to fetch from Auth0 after token refresh: ${retryResponse.status}`);
//                 }

//                 return retryResponse.json();
//             }

//             if (!response.ok) {
//                 if (response.status === 404) {
//                     throw new Error('Not found');
//                 }
//                 throw new Error(`Failed to fetch from Auth0: ${response.status}`);
//             }

//             return response.json();
//         } catch (error) {
//             console.error('Error in fetchFromAuth0:', error);
//             throw error;
//         }
//     }

//     async patchUserData(newData: object, user_id: string): Promise<any> {
//         const accessToken = await this.getAccessToken();
//         const axios = require('axios');
//         let data = JSON.stringify(newData);

//         let config = {
//             method: 'patch',
//             maxBodyLength: Infinity,
//             url: `${this.domain}/api/v2/users/${user_id}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`,
//             },
//             data: data
//         };

//         try {
//             const response = await axios.request(config);  // Await the Axios request
//             console.log(JSON.stringify(response.data));
//             return response.data;  // Return the actual response
//         } catch (error) {
//             console.error('Error in patching user data:', error);
//             throw error;  // Throw the error so it can be caught by the caller
//         }
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
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                audience: this.audience,
                grant_type: "client_credentials"
            }),
            // Ensure fetch doesn't use cached responses
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Token refresh failed:', response.status, errorText);
            throw new Error(`Failed to refresh access token: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpirationTime = Date.now() + ((data.expires_in - 60) * 1000); // Refresh 1 minute before expiration
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
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Cache-Control': 'no-store'
                },
                // Disable caching for this request
                cache: 'no-store',
                next: { revalidate: 0 }
            });

            if (response.status === 401) {
                await this.refreshAccessToken();
                const retryResponse = await fetch(`${this.domain}/api/v2/${endpoint}`, {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Cache-Control': 'no-store'
                    },
                    cache: 'no-store',
                    next: { revalidate: 0 }
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

    async patchUserData(newData: object, user_id: string): Promise<any> {
        const accessToken = await this.getAccessToken();
        const axios = require('axios');
        const data = JSON.stringify(newData);

        const config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${this.domain}/api/v2/users/${user_id}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'Cache-Control': 'no-store'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            console.log(JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.error('Error in patching user data:', error);
            throw error;
        }
    }
}
