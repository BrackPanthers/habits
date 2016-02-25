// import all required controllers/modules up here using 'require'
var userCtrl = require('./controllers/userCtrl'),
    habitCtrl = require('./controllers/habitCtrl'),
    config = require('./config');
    

module.exports = function(app) {
  var passport = require('./passport')(config, app);

  app.get('/test', function(req, res) {
    res.send('TEST ENDPOINT HIT!');
  });

  // user endpoints
  app.post('/users', userCtrl.create);
  app.get('/auth/google', passport.authenticate('google', {scope: 'openid email profile'}))
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/#/login' }), function(req, res) {
        //Authentication Successful!
        console.log("Google Auth Successful");
        res.redirect('/#/profile');
    });

  // habit endpoints
  app.post('/habits', habitCtrl.create);
}
