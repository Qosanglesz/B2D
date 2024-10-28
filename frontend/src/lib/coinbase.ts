// src/lib/coinbase.ts
import { Client } from 'coinbase-commerce-node';

if (!process.env.COINBASE_COMMERCE_API_KEY) {
    throw new Error('COINBASE_COMMERCE_API_KEY is not defined');
}

Client.init(process.env.COINBASE_COMMERCE_API_KEY);