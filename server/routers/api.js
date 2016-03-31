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
      key: team.key,
      matchKey: info.match
    });
  })
  
  router.get('/live', function (req, res) {
    res.socket.setTimeout(10000000);
    
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
    res.write('\n');
    
    logic.openConnections.push(res);
    
    req.on("close", function() {
      var toRemove;
      for (var j =0 ; j < logic.openConnections.length ; j++) {
        if (logic.openConnections[j] == res) {
          toRemove =j;
          break;
        }
      }
      logic.openConnections.splice(j,1);
      console.log('Current connections: ' + logic.openConnections.length);
    });
  })
  
  // Match action, see logic.js for the expected syntax
  router.post('/action', function (req, res) {
    var info = req.body;
    var action = new Action(info.type, info.time, info.data);
    
    logic.getMatch(info.match).addAction(action);
    logic.sendMessage({message: 'action!'})
    
    res.sendStatus(200);
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
    var matchKey = req.params.match;
    
    res.json(logic.getMatch(matchKey));
  })
  
  router.get('/:match/:team', function (req, res) {
    var matchKey = req.params.match;
    var teamKey  = req.params.team;
    
    res.json(logic.getMatch(matchKey).getTeam(teamKey));
  })
  
  return router;
};
