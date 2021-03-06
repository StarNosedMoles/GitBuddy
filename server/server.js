const express = require('express');
const app = express();
const path = require('path');

//auth controllers
const OAuthController = require('./controllers/auth/OAuthController');
const cookieController = require('./controllers/auth/cookieController');
const sessionController = require('./controllers/auth/sessionController');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());//my vscode sais bodyParser is depreciated... we can use express.json?
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {//check for cookies?
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/build', express.static(path.join(__dirname, '../build')));
//main OAuth Complete
app.get('/login', 
  OAuthController.getCode,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  //startSession
  //in retrospect, I think it makes sence to combing the get and create controlers into one
  
  (req, res) => {
    //on successful login - redirect to root
    return res.send('OAuth login complete');
  }
);

app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});
   
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

if(process.env.NODE_ENV === 'production'){
// statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}
  
app.listen(3000);

