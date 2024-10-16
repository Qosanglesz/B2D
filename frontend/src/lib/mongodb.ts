import {MongoClient, ServerApiVersion} from 'mongodb';


const url = process.env.MONGODB_URL;

if (!url) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
}

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let clientPromise: Promise<MongoClient>;
clientPromise = client.connect();

export default clientPromise;
