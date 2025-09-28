const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/';

let db;

async function connectToDatabase() {
  if (!db) { 
    const client = new MongoClient(url);
    await client.connect();
    db = client.db('TaskDB');
    console.log('Connected to database');
  }
  return db;
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}
module.exports = { connectToDatabase, getDatabase };