const {ObjectId, MongoClient} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'singhtek-db'
const collectionName = 'users';

const dummyUser = {
    username: 'john_doe',
    email: 'john@example.com',
    age: 30,
};

async function connectToDatabase() {
    try {
        const client = new MongoClient(connectionURL);
        await client.connect();
        console.log('Database connected properly --->');
        await client.close();
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

connectToDatabase();

