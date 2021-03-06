const express = require('express');
const app = express();
const path = require('path');

//auth controllers
const OAuthController = require('./controllers/auth/OAuthController');
const cookieController = require('./controllers/auth/cookieController');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/build', express.static(path.join(__dirname, '../build')));
//main OAuth Complete
//UPDATE ---- to serve index after successful login WORKS GREAT
app.get('/main', (req, res) => {
return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/login', 
  OAuthController.getCode,
  cookieController.setSSIDCookie,
  //startSession
  
  (req, res) => {
    //on successful login - redirect to root
    // return res.end();
    return res.redirect('/main');
  }
);

app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});
   
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

if(process.env.NODE_ENV === "production"){
// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});
}
  
app.listen(3000);

