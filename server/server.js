const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

//auth controllers
const OAuthController = require("./controllers/auth/OAuthController");
const cookieController = require("./controllers/auth/cookieController");
const sessionController = require("./controllers/sessionController");
const userController = require("./controllers/userController");
const bodyParser = require("body-parser");

app.use(bodyParser.json()); //my vscode sais bodyParser is depreciated... we can use express.json?
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //check for cookies?
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, "../client/index.html"));
});

app.use("/build", express.static(path.join(__dirname, "../build")));
//main OAuth Complete
//UPDATE ---- to serve index after successful login WORKS GREAT
app.get("/main", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

app.get(
  "/login",
  OAuthController.getCode,
  OAuthController.getUser,
  //user object now availabe on res.locals.user
  cookieController.setSSIDCookie,
  sessionController.startSession,
  userController.getOrCreateUser,
  userController.createUser,
  //createUser
  // userController.getOrCreateUser,
  //startSession
  //in retrospect, I think it makes sence to combing the get and create controlers into one

  (req, res) => {
    //on successful login - redirect to root
    // return res.end();
    return res.redirect("/main");
  }
);

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

if (process.env.NODE_ENV === "production") {
  // statically serve everything in the build folder on the route '/build'
  app.use("/build", express.static(path.join(__dirname, "../build")));
  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, "../index.html"));
  });
}

app.listen(3000);
