const db = require('../buddyModels');


const userController = {};

userController.getUser = (req, res, next) => {
  //check db if user in database
  const query = {
    text: 'SELECT github_user_id FROM users WHERE github_user_id = $1',
    values: [`${res.locals.userId}`]
  };

  db.query(query, (err, result) => {

    if(result.rows.length === 0) {
      return next();
    }
    
    if (err) {
      return next({
        message: 'No user'
      });
    }
  });
};

userController.createUser = (req, res, next) => {

};

module.exports = userController;