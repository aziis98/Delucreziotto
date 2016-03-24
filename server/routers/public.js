module.exports = function (express, __root) {
  
  var router = express.Router();
  
  router.use('/', express.static(__root + '/public'));
  
  return router;
};
