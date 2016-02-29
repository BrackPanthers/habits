// import all required controllers/modules up here using 'require'
var userCtrl = require('./controllers/userCtrl'),
    habitCtrl = require('./controllers/habitCtrl'),
    authCtrl = require('./controllers/authCtrl');

module.exports = function(app) {
  // all endpoints go in here
  app.get('/test', function(req, res) {
    res.send('TEST ENDPOINT HIT!');
  });

  // user endpoints
  app.post('/users', userCtrl.create);
  app.get('/user/:userId', userCtrl.map);

  // auth endpoints
  app.get('/auth', authCtrl.checkAuth, function(req, res) {
    res.send(req.user);
  });
  app.get('/auth/facebook', authCtrl.facebookAuth);


  // habit endpoints
  app.get('/api/habits', habitCtrl.read);
  app.post('/api/habits', habitCtrl.create);
  app.put('/api/habits/:id', habitCtrl.update);
  app.put('/loghabit/:habitId', habitCtrl.log);
  app.delete('/deletehabit/:habitId', habitCtrl.delete);
}
