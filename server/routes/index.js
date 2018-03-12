var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {

  app.get('/', require('./mainpage').get);

  app.get('/login', checkAuth.isUnAuth, require('./login').get);
  app.post('/login', checkAuth.isUnAuth, require('./login').post);

  app.get('/logout', checkAuth.isAuth, require('./logout').get);

  app.get('/register', checkAuth.isUnAuth, require('./register').get);
  app.post('/register', checkAuth.isUnAuth, require('./register').post);

  app.get('/generatorRandom', require('./generatorRandom').get);
  app.post('/generatorRandom', checkAuth.isAuth, checkAuth.isInProc, require('./generatorRandom').post);
  app.get('/check', checkAuth.isAuth, require('./generatorRandom').check);
  app.post('/stopProc', checkAuth.isAuth, require('./generatorRandom').stopProc);
  app.get('/checkIsInProc', checkAuth.isAuth, require('./generatorRandom').checkIsInProc);

  app.get('/history', checkAuth.isAuth, require('./history').get);
};
