const Mongo = require('mongodb').MongoClient;
const dotenv = require("dotenv"); dotenv.config();

const url = process.env.MONGODB_URI;
const mongoClient = new Mongo(url);

class TeamsRepository {
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

  createTeam(team) {
    const db = mongoClient.db();
    const teams = db.collection('teams');
    return teams.insertOne(team);
  }

  getTeamByName(teamName) {
    const db = mongoClient.db();
    const teams = db.collection('teams');
    return teams.findOne({name: teamName});
  }

  updateTeam(team) {
    const db = mongoClient.db();
    const teams = db.collection('teams');
    return teams.replaceOne({name: team.name}, team);
  }

  deleteTeam(teamName) {
    const db = mongoClient.db();
    const teams = db.collection('teams');
    return teams.deleteOne({name: teamName});
  }
}

module.exports = TeamsRepository;
