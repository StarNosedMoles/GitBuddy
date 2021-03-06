const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.use('/build', express.static(path.join(__dirname, '../build')))

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