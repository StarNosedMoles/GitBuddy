const fetch = require('node-fetch');
const db = require('../buddyModels');
const Octokat = require('octokat');
const octo = new Octokat({ token: 'b00a94451c1b2a5dd2cb8dcde81c4264ad3b1474' });
const session = require('express-session');

const repoController = {};

repoController.getRepos = (req, res, next) => {
//fetch request to github_repos_url
  fetch(res.locals.user.github_repos_url,{
    headers: {Authorization: `token ${req.cookies.SSID}`} 
  })
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      //need to populate sequel DB with result?/////////////////////////////////////////////////////////////////////////////////////////////////
      //parse data and grab name of each repo
      const arrOfRepos = data.map(async repoObj => {
        // create a new promise object
          // in the callback to the Promise constructor,
            // perform your async actions
            // when they complete, call resolve(), thus resolving the promise

        //check if isnt repo is in DB by using repoObj.id with _id 
        let repoResult;

        const queryToGetRepo = {
          text: 'SELECT * FROM github_repo WHERE repo_id = $1',
          values: [`${repoObj.id}`]
        };

        db.query(queryToGetRepo, (err, result) => {
          // console.log('result from getRepo query================', result.rows);
          if (err) {
            return next({
              message: 'Error finding repo in repos database in repoController.getRepos ',
              error: err,
            });
          }
          else if (!result.rows[0]) {
            //create entry in repo DB
          
            const queryToCreateRepo = {
              text: `INSERT INTO github_repo (full_name, 
              
                owner_login, repo_id, stargazers_url) 
                      VALUES ($1, $2, $3, $4)`,
              values: [
                repoObj.name,
                // repoObj.owner.id,
                repoObj.owner.login,
                repoObj.id,
                repoObj.stargazers_url
              ]   
            };
  
            db.query(queryToCreateRepo, (err, result) => {
              //console.log('result from sql query=================', result);
              if (err) return next({
                message: 'Error adding repo to database in repoController.getRepos',
                error: err,
              });
              
              else repoResult = {
                name: repoObj.name,
                stargazersUrl: repoObj.stargazers_url,
                id: repoObj.id
              };
            });
          }
          //repo exists in db
          else repoResult = {
            name: result.rows[0].full_name,
            stargazersUrl: result.rows[0].stargazers_url,
            id: result.rows[0].repo_id 
          };
        }).then(data=> {repoResult})
        return repoResult;
        
       
        //if not in database => create new repo entry in database
        //return entry from database with {name:__________, stargazersUrl: ________________}
  
        // return {
        //   name: repoObj.name,
        //   //need to send watchers_url or stargazers_url instead of subscribers_url
        //   stargazersUrl: repoObj.stargazers_url
        // };
      });
      console.log('arr of repos===================================', arrOfRepos);
      Promise.all(arrOfRepos)
        .then(data => {
          console.log(data);
          data.flat();
        })
        .catch(err => {
          console.log('error with promise.all ======', err);
        });
      res.locals.userWithRepos = {
        user: res.locals.user,
        repos: arrOfRepos
      };
  
      return next();      
    })
    .catch(err => {
      return next({
        message: 'Error getting repos in repoController.getRepos',
        error: err
      });
    });
};

module.exports = repoController;
