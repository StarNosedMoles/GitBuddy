const fetch = require("node-fetch");
const db = require("../buddyModels");
const Octokat = require("octokat");
const octo = new Octokat({ token: `b00a94451c1b2a5dd2cb8dcde81c4264ad3b1474` });

const userController = {};

userController.getOrCreateUser = (req, res, next) => {
  //check db if user in database
  console.log("res locals: ", res.locals);
  const queryToGet = {
    text: "SELECT * FROM users WHERE github_user_id = $1",
    values: [`${res.locals.userId}`],
  };
  db.query(queryToGet, (err, result) => {
    console.log("result: ", result);
    if (/*no user ... result.rows.length === 0*/ 0 === 0) {
      return next();
    } else if (err) {
      return next({
        message: "Error getting users", //are you sure we dont have to pass in err into next?
      });
    } else {
      return next();
    }
  });
};
userController.githubApi = (req, res, next) => {
  res.locals.userId = '5877145'
  const token = `b00a94451c1b2a5dd2cb8dcde81c4264ad3b1474`
  fetch(`https://api.github.com/user/${res.locals.userId}`, {
    headers: {Authorization: `token ${token}`}
  })
    .then(res => res.json())
    .then(json => {console.log(json)})
    .then((data) => {return next()});

  // octo
  //   .user("5877145").fetch()
  //   .then((data) => {
  //     console.log(data)
  //     return next();
  //   });
};

userController.createUser = (req, res, next) => {
  //run api call on userid

  const queryToCreate = {
    text: `INSERT INTO users (github_url, github_followers_url, github_repos_url, name, github_email, github_twitter_username, updated, github_user_id) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, //i believe user_is is automatically generated
    values: [apiCall.url],
  };
};

module.exports = userController;
