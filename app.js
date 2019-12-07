const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const request = require('request');
const app = express();
const port = process.env.PORT || 8080;
const riot = 'https://na1.api.riotgames.com/lol'
const API_KEY = process.env.API_KEY;

const UserRepository = require("./users.js");
const CommentsRepository = require("./comments.js");
const Users = new UserRepository();
const Comments = new CommentsRepository();

app.use(cors());
app.use(bodyParser.json());

app.get('/summoners/:name', (req, res) => getSummonerByName(req, res));
app.get('/spectator/featured', (req, res) => getFeaturedSpectate(req, res));
app.get('/champion', (req, res) => getChampionRotations(req, res));
app.get('/matches/by-account/:id', (req, res) => getMatchesBySummonerId(req, res));
app.get('/matches/by-account/:id/queue/:queue', (req, res) => getMatchesBySummonerIdQueue(req, res));
app.get('/matches/:id', (req, res) => getMatchById(req, res));

app.post('/users', (req, res) => registerUser(req, res));
app.get('/users', (req, res) => getUsers(req, res));
app.get('/users/:name', (req, res) => getUserByName(req, res));
app.post('/login', (req, res) => login(req, res));
app.put('/users/:name', (req, res) => updateUser(req, res));
app.post('/comments', (req, res) => createComment(req, res));
app.get('/matches/:id/comments', (req, res) => getCommentsForMatch(req, res));
app.get('/users/:name/comments', (req, res) => getCommentsForUser(req, res));
app.get('/comments', (req, res) => getComments(req, res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function getComments(req, res) {
  Comments.getComments()
  .then((data) => res.send(data));
}

function getCommentsForMatch(req, res) {
  const matchId = req.params.id;
  Comments.getCommentsForMatch(matchId)
  .then((data) => res.send(data));
}

function getCommentsForUser(req, res) {
  const username = req.params.name;
  Comments.getCommentsForUser(username)
  .then((data) => res.send(data));
}

function createComment(req, res) {
  const comment = req.body;
  Comments.createComment(comment)
  .then((status) => res.send('ok'));
}

function updateUser(req, res) {
  const username = req.params.name;
  const user = req.body;
  Users.updateUser(username, user)
  .then((status) => res.send(status));
}

function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  Users.login(username, password)
  .then((status) => res.send(status));
}

function getUserByName(req, res) {
  const username = req.params.name;
  Users.getUserByName(username)
  .then((data) => res.send(data));
}

function getUsers(req, res) {
  Users.getUsers()
  .then((data) => res.send(data));
}

function registerUser(req, res) {
  const user = req.body;
  Users.registerUser(user)
  .then((status) => res.send("ok"));
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
