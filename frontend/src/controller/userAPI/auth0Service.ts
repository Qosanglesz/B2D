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
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Cache-Control': 'no-store'
//             },
//             body: JSON.stringify({
//                 client_id: this.clientId,
//                 client_secret: this.clientSecret,
//                 audience: this.audience,
//                 grant_type: "client_credentials"
//             }),
//             // Ensure fetch doesn't use cached responses
//             cache: 'no-store'
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Token refresh failed:', response.status, errorText);
//             throw new Error(`Failed to refresh access token: ${response.status} ${errorText}`);
//         }

//         const data = await response.json();
//         this.accessToken = data.access_token;
//         this.tokenExpirationTime = Date.now() + ((data.expires_in - 60) * 1000); // Refresh 1 minute before expiration
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
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`,
//                     'Cache-Control': 'no-store'
//                 },
//                 // Disable caching for this request
//                 cache: 'no-store',
//                 next: { revalidate: 0 }
//             });

//             if (response.status === 401) {
//                 await this.refreshAccessToken();
//                 const retryResponse = await fetch(`${this.domain}/api/v2/${endpoint}`, {
//                     headers: {
//                         'Authorization': `Bearer ${this.accessToken}`,
//                         'Cache-Control': 'no-store'
//                     },
//                     cache: 'no-store',
//                     next: { revalidate: 0 }
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
//         const data = JSON.stringify(newData);

//         const config = {
//             method: 'patch',
//             maxBodyLength: Infinity,
//             url: `${this.domain}/api/v2/users/${user_id}`,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json',
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Cache-Control': 'no-store'
//             },
//             data: data
//         };

//         try {
//             const response = await axios.request(config);
//             console.log(JSON.stringify(response.data));
//             return response.data;
//         } catch (error) {
//             console.error('Error in patching user data:', error);
//             throw error;
//         }
//     }
// }


// services/auth0Service.ts
import axios from 'axios';

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
        try {
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
                cache: 'no-store'
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Token refresh failed:', response.status, errorText);
                throw new Error(`Failed to refresh access token: ${response.status} ${errorText}`);
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            this.tokenExpirationTime = Date.now() + ((data.expires_in - 60) * 1000);
            console.log('Access token refreshed successfully');
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
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

    async patchUserData(newData: any, user_id: string): Promise<any> {
        try {
            // First, check if the user exists in Auth0
            const userData = await this.fetchFromAuth0(`users/${user_id}`);
            
            // If the user is authenticated through Google OAuth2, we'll only update allowed fields
            const isGoogleUser = userData.identities?.some((identity: any) => 
                identity.provider === 'google-oauth2'
            );

            if (isGoogleUser) {
                // For Google OAuth2 users, we'll only update fields that are allowed
                const allowedFields = ['user_metadata', 'app_metadata'];
                const filteredData: any = {};
                
                for (const field of allowedFields) {
                    if (newData[field]) {
                        filteredData[field] = newData[field];
                    }
                }

                // Store name and nickname in user_metadata
                if (!filteredData.user_metadata) {
                    filteredData.user_metadata = {};
                }
                
                if (newData.name) {
                    filteredData.user_metadata.custom_name = newData.name;
                }
                if (newData.nickname) {
                    filteredData.user_metadata.custom_nickname = newData.nickname;
                }

                // Only make the Auth0 API call if we have allowed fields to update
                if (Object.keys(filteredData).length > 0) {
                    const accessToken = await this.getAccessToken();
                    const response = await axios({
                        method: 'patch',
                        url: `${this.domain}/api/v2/users/${user_id}`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                            'Cache-Control': 'no-store'
                        },
                        data: filteredData
                    });

                    return {
                        auth0Update: response.data,
                        isGoogleUser: true,
                        message: 'Updated user metadata only due to Google OAuth2 restrictions'
                    };
                }

                return {
                    isGoogleUser: true,
                    message: 'No updates performed due to Google OAuth2 restrictions'
                };
            } else {
                // For non-Google users, proceed with normal update
                const accessToken = await this.getAccessToken();
                const response = await axios({
                    method: 'patch',
                    url: `${this.domain}/api/v2/users/${user_id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                        'Cache-Control': 'no-store'
                    },
                    data: newData
                });

                return {
                    auth0Update: response.data,
                    isGoogleUser: false,
                    message: 'Updated user data successfully'
                };
            }
        } catch (error) {
            console.error('Error in patching user data:', error);
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                throw new Error('Cannot update restricted fields for this user type');
            }
            throw error;
        }
    }
}