// Copyright 2016 Antonio De Lucreziis

var logic = require('../logic/logic.js');
var bodyParser = require('body-parser');

module.exports = function (express, __root) {

  var router = express.Router();
  
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  
  // Post things here to create a new match
  router.post('/newmatch', function (req, res) {
    var info = req.body;
    var match = new Match(info.name, info.answers, info.startTime, info.options);
    
    logic.addMatch(match);
    
    res.json({
      key: match.key,
      adminKey: match.adminKey
    });
  })
  
  router.post('/newteam', function (req, res) {
    var info = req.body;
    var team = new Team(info.name);
    
    logic.getMatch(info.match).addTeam(team);
    
    res.json({
      key: team.key
    });
  })
  
  // Match action, see logic.js for the expected syntax
  router.post('/action', function (req, res) {
    var info = req.body;
    var action = new Action(info.type, info.time, info.data);
    
    logic.getMatch(info.match).addAction(action);
    
    res.send(200);
  })
    
  // GET the list of all the match registered on the server
  router.get('/list', function (req, res) {
    res.json(logic.getMatches());
  })
  
  router.get('/has/:match', function (req, res) {
    res.json(logic.getMatch(req.params.match) !== undefined);
  })
  
  // Sub Specific Routes
  router.get('/:match', function (req, res) {
    var matchKey = req.param('match');
    
    res.json(logic.getMatch(matchKey));
  })
  
  router.get('/:match/:team', function (req, res) {
    var matchKey = req.param('match');
    var teamKey  = req.param('team');
    
    res.json(logic.getMatch(matchKey).getTeam(teamKey));
  })
  
  return router;
};
