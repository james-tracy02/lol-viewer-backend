const Mongo = require('mongodb').MongoClient;
const dotenv = require("dotenv"); dotenv.config();

const url = process.env.MONGODB_URI;
const mongoClient = new Mongo(url);

class UsersRepository {
  constructor() {
    mongoClient.connect((err) => {
      if(!err) {
        console.log('connected to mongo');
      }
    });
  }

  registerUser(user) {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.insertOne(user);
  }

  getUsers() {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.find();
  }
}

module.exports = UsersRepository;
