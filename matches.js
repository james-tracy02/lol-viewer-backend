const Mongo = require('mongodb').MongoClient;
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

  getTeams() {
    const db = mongoClient.db();
    const teams = db.collection('teams');
    return teams.find().toArray();
  }

  createMatches(match) {
    const db = mongoClient.db();
    const teams = db.collection('matches');
    return match.insertOne(match);
  }

  getManyMatchesById(ids) {
    const db = mongoClient.db();
    const teams = db.collection('matches');
    return teams.find({_id: {$in: ids}}).toArray();
  }

  updateMatch(match) {
    const db = mongoClient.db();
    const teams = db.collection('matches');
    return teams.replaceOne({_id: match._id}, match);
  }

  deleteMatch(matchId) {
    const db = mongoClient.db();
    const teams = db.collection('matches');
    return teams.deleteOne({_id: matchId});
  }
}

module.exports = MatchesRepository;
