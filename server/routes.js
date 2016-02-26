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

  // habit endpoints
  app.post('/habits', habitCtrl.create);

  // auth endpoints
  app.get('/auth', authCtrl.checkAuth, function(req, res) {
    res.send({'User authed with ID': req.user});
  });
  app.get('/auth/facebook', authCtrl.facebookAuth);
}
