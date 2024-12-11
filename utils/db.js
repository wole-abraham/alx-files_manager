const { MongoClient } = require('mongodb');

// Environment variables
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client.connect()
      .then(() => {
        this.db = this.client.db(DB_DATABASE);
      })
      .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        this.db = null;
      });
  }

  isAlive() {
    return this.client && this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    try {
      const collection = this.db.collection('users');
      return await collection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const collection = this.db.collection('files');
      return await collection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

// Export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
