module.exports = function (express, __root) {
  
  var router = express.Router();
  
  router.use('/', express.static(__root + '/client/*'));
  
  router.get('/', function (req, res) {
    res.sendFile(__root + '/client/home.html');
  })
  
  router.get('/admin/:match', function (req, res) {
    res.sendFile(__root + '/client/controlpanel.html');
  })
  
  router.get('/:match', function (req, res) {
    res.sendFile(__root + '/client/app.html');
  })
  
  router.get('/:match/:team', function (req, res) {
    res.sendFile(__root + '/client/app.html');
  })
  
  return router;
};
