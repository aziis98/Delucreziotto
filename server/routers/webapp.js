module.exports = function (express, __root) {
  
  var router = express.Router();
  
  router.get('/admin', function (req, res) {
    res.sendFile(__root + '/client/controlpanel.html');
  })
  
  router.use('/', express.static(__root + '/client/*'));
  
  router.get('/', function (req, res) {
    res.sendFile(__root + '/client/home.html');
  })
  
  router.get('/:match', function (req, res) {
    res.sendFile(__root + '/client/app.html');
  })
  
  router.get('/:match/:team', function (req, res) {
    res.sendFile(__root + '/client/app.html');
  })
  
  return router;
};
