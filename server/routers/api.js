module.exports = function (express, __root) {

  var router = express.Router();
  
  router.get('/:match', function (req, res) {
    var matchId = req.param('match');
    
    res.json(/* send the match object */);
  })
  
  router.get('/:match/:team', function (req, res) {
    var matchId = req.param('match');
    var teamId  = req.param('team');
    
    res.json(/* send the team object */);
  })
  
  return router;
};
