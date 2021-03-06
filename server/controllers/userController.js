const fetch = require("node-fetch");
const db = require("../buddyModels");
const Octokat = require("octokat");
const octo = new Octokat({ token: `b00a94451c1b2a5dd2cb8dcde81c4264ad3b1474` });
const session = require("express-session");

const userController = {};

userController.getUser = (req, res, next) => {
  //check db if user in database
  //console.log("res locals: ", res.locals);
  const queryToGet = {
    text: "SELECT * FROM users WHERE github_user_id = $1",
    values: [`${res.locals.user.id}`],
  };
  db.query(queryToGet, (err, result) => {
    //console.log("result: ", result);
    //console.log('ROWS', result.rows)
    if (result.rows.length === 0) {
      return next();
    } else if (err) {
      return next({
        message: "Error getting users",
        error: err,
      });
    } else {
      // console.log(result.rows)
      res.locals.user = result.rows[0];
      return res.redirect("/main");
      // return next();
    }
  });
};
// userController.githubApi = (req, res, next) => {
//   res.locals.userId = '5877145'
//   const token = `b00a94451c1b2a5dd2cb8dcde81c4264ad3b1474`
//   fetch(`https://api.github.com/user/${res.locals.userId}`, {
//     headers: {Authorization: `token ${token}`}
//   })
//     .then(res => res.json())
//     .then(json => {console.log(json)})
//     .then((data) => {return next()});

//   // octo
//   //   .user("5877145").fetch()
//   //   .then((data) => {
//   //     console.log(data)
//   //     return next();
//   //   });
// };

userController.createUser = (req, res, next) => {
  const user = res.locals.user;
  const queryToCreate = {
    text: `INSERT INTO users (github_url, github_followers_url, github_repos_url, name, github_email, github_twitter_username, github_user_id, github_login) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, //i believe user_is is automatically generated
    values: [
      user.html_url,
      user.followers_url,
      user.repos_url,
      user.name,
      user.email,
      user.twitter_username,
      user.id,
      user.login,
    ],
  };
  db.query(queryToCreate, (err, result) => {
    if (err)
      return next({
        message: "Error creating user",
        error: err,
      });
    else {
      console.log("User entry worked!--------------------------------");
      res.locals.user = result.rows[0];
      return next();
    }
  });
};


module.exports = userController;
