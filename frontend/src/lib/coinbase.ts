// src/lib/coinbaseClient.ts
import { Client, resources , Webhook} from 'coinbase-commerce-node';

// Check if the API key is defined
const apiKey = process.env.COINBASE_COMMERCE_API_KEY;
if (!apiKey) {
    throw new Error('COINBASE_COMMERCE_API_KEY is not defined');
}

// Initialize the Coinbase client
Client.init(apiKey);

// Export the initialized client and resources
export const coinbaseClient = Client;
export const Charge = resources.Charge; // Export the Charge resource for use in other modules
export { Webhook };