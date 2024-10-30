// tests/webhook.test.ts
import crypto from 'crypto';
import axios from 'axios';

const WEBHOOK_SECRET = '88d7d863-17e0-40e7-9bc5-62815c4c36fd'; // Replace with your actual webhook secret
const YOUR_NGROK_URL = 'https://34dd-183-88-250-6.ngrok-free.app'; // Replace with your ngrok URL

const createConfirmationEvent = () => {
  return {
    "type": "charge:confirmed",
    "data": {
      "code": "L7DZGLAD",
      "id": "6cdc03e7-3f25-4b7c-b3b3-dd77a7a11cd2",
      "resource": "charge",
      "name": "Investment in OceanGuard",
      "description": "Investment in OceanGuard",
      "hosted_url": "https://commerce.coinbase.com/pay/6cdc03e7-3f25-4b7c-b3b3-dd77a7a11cd2",
      "created_at": "2024-10-30T15:17:09Z",
      "confirmed_at": new Date().toISOString(),
      "expires_at": "2024-11-01T15:17:09Z",
      "pricing": {
        "local": {
          "amount": "10.00",
          "currency": "USD"
        },
        "settlement": {
          "amount": "10.00",
          "currency": "USDC"
        }
      },
      "payments": [
        {
          "network": "ethereum",
          "transaction_id": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
          "status": "CONFIRMED",
          "detected_at": new Date().toISOString(),
          "value": {
            "local": {
              "amount": "10.00",
              "currency": "USD"
            },
            "crypto": {
              "amount": "0.005",
              "currency": "ETH"
            }
          },
          "block": {
            "height": 1234567,
            "hash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            "confirmations_accumulated": 8,
            "confirmations_required": 2
          }
        }
      ],
      "timeline": [
        {
          "time": "2024-10-30T15:17:09Z",
          "status": "NEW"
        },
        {
          "time": new Date().toISOString(),
          "status": "COMPLETED",
          "payment": {
            "network": "ethereum",
            "transaction_id": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
          }
        }
      ],
      "metadata": {
        "userId": "google-oauth2|117803625253793925165",
        "campaignId": "f1bc8d12-446c-43c4-a3e4-7edb753d796d",
        "campaignName": "OceanGuard",
        "companyName": "OceanGuard",
        "userEmail": "chaiyawut.t@ku.th"
      }
    }
  };
};

const signWebhook = (body) => {
  if (!WEBHOOK_SECRET) {
    throw new Error('WEBHOOK_SECRET is not defined');
  }
  // Use the exact same signature format as Coinbase
  const timestamp = Math.floor(Date.now() / 1000);
  const signaturePayload = timestamp + body;
  const signature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(signaturePayload)
    .digest('hex');

  return {
    signature,
    timestamp
  };
};

const testWebhook = async () => {
  try {
    const event = createConfirmationEvent();
    const bodyString = JSON.stringify(event);
    const { signature, timestamp } = signWebhook(bodyString);

    console.log('Sending webhook request...');
    console.log('Signature:', signature);
    console.log('Timestamp:', timestamp);
    console.log('Event data:', JSON.stringify(event, null, 2));

    const response = await axios.post(
      `${YOUR_NGROK_URL}/api/payment/coinbase/webhook`,
      bodyString,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CC-Webhook-Signature': signature,
          'X-CC-Webhook-Timestamp': timestamp.toString()
        }
      }
    );

    console.log('Webhook response:', response.data);
    await verifyTransaction();

  } catch (error) {
    console.error('Webhook test error:', error.response?.data || error.message);
  }
};

const verifyTransaction = async () => {
  try {
    const response = await axios.get(
      `${YOUR_NGROK_URL}/api/payment/coinbase/transaction`,
      {
        params: {
          chargeId: '6cdc03e7-3f25-4b7c-b3b3-dd77a7a11cd2'
        }
      }
    );
    console.log('Transaction verification:', response.data);
  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
  }
};

// Run the test
console.log('Starting webhook test...');
testWebhook();