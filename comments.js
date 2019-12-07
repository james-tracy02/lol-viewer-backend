const Mongo = require('mongodb').MongoClient;
const dotenv = require("dotenv"); dotenv.config();

const url = process.env.MONGODB_URI;
const mongoClient = new Mongo(url);

class CommentsRepository {
  constructor() {
    mongoClient.connect((err) => {
      if(!err) {
        console.log('connected to mongo');
      }
    });
  }

  createComment(comment) {
    const db = mongoClient.db();
    const comments = db.collection('comments');
    return comments.insertOne(comment);
  }

  getCommentsForMatch(matchId) {
    const db = mongoClient.db();
    const comments = db.collection('comments');
    return comments.find({matchId: matchId}).toArray();
  }

  getCommentsForUser(userId) {
    const db = mongoClient.db();
    const comments = db.collection('comments');
    return comments.find({userId: userId}).toArray();
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

module.exports = CommentsRepository;
