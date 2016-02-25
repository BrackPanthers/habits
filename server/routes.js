// import all required controllers/modules up here using 'require'
var userCtrl = require('./controllers/userCtrl'),
    habitCtrl = require('./controllers/habitCtrl');

module.exports = function(app) {
  // all endpoints go in here
  app.get('/test', function(req, res) {
    res.send('TEST ENDPOINT HIT!');
  });

  // user endpoints
  app.post('/users', userCtrl.create);

  // habit endpoints
  app.post('/habits', habitCtrl.create);
  app.get('/habits', habitCtrl.read);
  app.put('/habits', habitCtrl.update);
//   app.delete('/habits', habitCtrl.delete)
}
