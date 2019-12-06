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

  updateUser(username, user) {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.findOne({
      username: username
    }).then((oldUser) => {
      if(oldUser) {
        users.replaceOne({username: username}, user);
      }
    }).then(() => "ok");
  }

  login(username, password) {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.find({
        username: username,
        password: password,
      }).toArray();
  }

  registerUser(user) {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.insertOne(user);
  }

  getUsers() {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.find().toArray();
  }

  getUserByName(username) {
    const db = mongoClient.db();
    const users = db.collection('users');
    return users.findOne({username: username});
  }
}

module.exports = UsersRepository;
