const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');

//auth controllers
const OAuthController = require('./controllers/auth/OAuthController');
const cookieController = require('./controllers/auth/cookieController');
const sessionController = require('./controllers/sessionController');
const userController = require('./controllers/userController');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(bodyParser.json()); //my vscode sais bodyParser is depreciated... we can use express.json?
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  //check for cookies?
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});
app.use('/', express.static(path.resolve(__dirname, '../client/assets/')));
app.use('/build', express.static(path.join(__dirname, '../build')));
//main OAuth Complete
//UPDATE ---- to serve index after successful login WORKS GREAT
app.get('/main', (req, res) => {
  //console.log("test for session object----------", req.session.user);
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

//test route for angusshire multiple api requests to grab follower details from selected repos
app.post('/repoPost', 
  userController.getUserInfoFromRepos,
  userController.getMultipleUsersInfo,
  (req, res) => {
    return res.json(res.locals.listOfUsersAndEmails);
  });

app.post('/allFollowers', 
  userController.getMultipleUsersInfo,
  (req, res) => {
    return res.json(res.locals.listOfUsersAndEmails);
  });  

app.get(
  '/login',
  OAuthController.getCode,
  OAuthController.getUser,
  cookieController.setSSIDCookie,
  //user object now availabe on res.locals.user
  // userController.getUser,
  // userController.createUser,

  // sessionController.startSession,
  //why not route to main here? then we can have a compnent did mount fets that will use our usercontroler :)

  (req, res) => {
    //on successful login - redirect to root
    // return res.end();
    //console.log("ROUTE REQ", req);
    return res.redirect('/main');
  }
);

app.get(
  '/getUser',
  OAuthController.getUser,
  userController.getUser,
  userController.createUser,
  //userController logic here instead of login to serve info from DB instead of API
  //more controllers to populate repo info before sending response
  userController.getRepos,
  //get one call
  //DO REPO DRILLING
  (req, res) => {

    return res.json(res.locals.userWithRepos);
  }
);



app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(3000);
