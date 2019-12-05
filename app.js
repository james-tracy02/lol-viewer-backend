const express = require('express');
const cors = require('cors');
require('dotenv').config();
const request = require('request');
const app = express();
const port = process.env.PORT || 8080;
const riot = 'https://na1.api.riotgames.com/lol'
const API_KEY = process.env.API_KEY;

const UserRepository = require("./users.js");
const Users = new UsersRepository();

app.use(cors());

app.get('/summoners/:name', (req, res) => getSummonerByName(req, res));
app.get('/spectator/featured', (req, res) => getFeaturedSpectate(req, res));
app.get('/champion', (req, res) => getChampionRotations(req, res));
app.get('/matches/by-account/:id', (req, res) => getMatchesBySummonerId(req, res));
app.get('/matches/by-account/:id/queue/:queue', (req, res) => getMatchesBySummonerIdQueue(req, res));
app.get('/matches/:id', (req, res) => getMatchById(req, res));

app.post('/users', (req, res) => registerUser(req, res));
app.get('/users', (req, res) => getUsers(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getUsers(req, res) {
  Users.getUsers()
  .then((data) => res.send(data));
}

function registerUser(req, res) {
  const user = req.body;
  Users.registerUser(user)
  .then((status) => res.send(status));
}

function getSummonerByName(req, res) {
  const name = req.params.name;

  var options = {
  url: `${riot}/summoner/v4/summoners/by-name/${name}`,
  headers: {
    'X-Riot-Token': API_KEY,
    }
  }

  request(options, (error, response, body) => {
    res.send(response);
  });
}

function getFeaturedSpectate(req, res) {
  var options = {
  url: `${riot}/spectator/v4/featured-games`,
  headers: {
    'X-Riot-Token': API_KEY,
    }
  }

  request(options, (error, response, body) => {
    res.send(response);
  });
}

function getChampionRotations(req, res) {
  var options = {
  url: `${riot}/platform/v3/champion-rotations`,
  headers: {
    'X-Riot-Token': API_KEY,
    }
  }

  request(options, (error, response, body) => {
    res.send(response);
  });
}

function getMatchesBySummonerId(req, res) {
  const id = req.params.id;

  var options = {
  url: `${riot}/match/v4/matchlists/by-account/${id}?endIndex=40`,
  headers: {
    'X-Riot-Token': API_KEY,
    }
  }

  request(options, (error, response, body) => {
    res.send(response);
  });
}

function getMatchesBySummonerIdQueue(req, res) {
  const id = req.params.id;
  const queue = req.params.queue;

  var options = {
  url: `${riot}/match/v4/matchlists/by-account/${id}?endIndex=40&queue=${queue}`,
  headers: {
    'X-Riot-Token': API_KEY,
    }
  }

  request(options, (error, response, body) => {
    res.send(response);
  });
}

function getMatchById(req, res) {
  const id = req.params.id;

  var options = {
  url: `${riot}/match/v4/matches/${id}`,
  headers: {
    'X-Riot-Token': API_KEY,
    }
  }

  request(options, (error, response, body) => {
    res.send(response);
  });
}
