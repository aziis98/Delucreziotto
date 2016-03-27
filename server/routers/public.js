// Copyright 2016 Antonio De Lucreziis

module.exports = function (express, __root) {
  
  var router = express.Router();
  
  router.use('/', express.static(__root + '/public'));
  
  return router;
};
