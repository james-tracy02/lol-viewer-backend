const Mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const dotenv = require("dotenv"); dotenv.config();

const url = process.env.MONGODB_URI;
const mongoClient = new Mongo(url);

class MatchesRepository {
  constructor() {
    mongoClient.connect((err) => {
      if(!err) {
        console.log('connected to mongo');
      }
    });
  }

  createMatch(match) {
    const db = mongoClient.db();
    const matches = db.collection('matches');
    return matches.insertOne(match);
  }

  getMatchesForTeam(teamname) {
    const db = mongoClient.db();
    const matches = db.collection('matches');
    return matches.find({team: teamname}).toArray();
  }

  updateMatch(match) {
    const db = mongoClient.db();
    const matches = db.collection('matches');
    return matches.replaceOne({_id: match._id}, match);
  }

  deleteMatch(matchId) {
    const db = mongoClient.db();
    const matches = db.collection('matches');
    return matches.deleteOne({_id: new ObjectId(matchId)});
  }
}

module.exports = MatchesRepository;
