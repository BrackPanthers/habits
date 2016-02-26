var mongoose = require('mongoose'),
    qs = require('querystring'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    request = require('request');

var User = require('./../models/User');

// function to create tokens
function createJWT(user) {
  var payload = {
    sub: user._id, // user data to include with token
    iat: moment().unix(), // created at
    exp: moment().add(4, 'days').unix() // expires at
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
};

module.exports = {
  checkAuth: function(req, res, next) {
    // if auth header isn't passed in with request
    if (!req.header('Authorization')) {
      res.status(401).send({message: 'No authorization header'});
    }

    // extract token & define payload
    var token = req.header('Authorization').split(' ')[1];
    var payload = null;

    // try to decode token:
    try {
      payload = jwt.decode(token, process.env.TOKEN_SECRET);
    }
    catch(err) { // resolve with error if fails
      return res.status(401).send({message: 'invalid token'});
    }

    // if token is expired, e.g. it's exp date is before now
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({message: 'token has expired'});
    }

    // if everything works (token is valid, etc)
    req.user = payload.sub; // attach user data to request, call next()
    next();
  },
  facebookAuth: function(req, res) {
    // define fields of data to pull from facebook & url
    var fields = ['id', 'email', 'name', 'first_name', 'last_name'];
    var access_token = req.query.fb_access_token; // pass access token in query

    if (!access_token) {
      res.status(401).send('Facebook access token required to auth with facebook.');
    }

    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',') + '&access_token=' + access_token;

    // retrieve fb profile info about user wanting to log in
    request.get({url: graphApiUrl, json: true}, function(err, response, profile) {
      // if getting profile fails, reject promise/ end login attempt
      if (response.statusCode !== 200) {
        res.status(500).send({message: profile.error.message});
      }

      // if profile retrieval success, see if user has already signed up:
      User.findOne({ facebook_id: profile.id }, function(err, existingUser) {
        if (err) {
          res.status(500).send('error searching for user');
        }

        // if user already exists in our database
        if (existingUser) {
          // update relevant user data for current users?
          var newToken = createJWT(existingUser); // create new token for user
          res.send({message: 'new token issued for existing user', token: newToken, user_id: existingUser._id}); // send token back to user + user_id
        } else {
          var newUser = new User();
          newUser.facebook_id = profile.id;
          newUser.email = profile.email;
          newUser.full_name = profile.name;
          newUser.first_name = profile.first_name;
          newUser.last_name = profile.last_name;
          // newUser.photo_url = profile.picture;
          console.log(newUser);
          newUser.save(function() {
            var token = createJWT(newUser);
            // return token and new user Id for routing to profile page
            res.send({message: 'token issued for new user', token: token, user_id: newUser._id});
          })
        }
      })
    });
  }
};
