const Session = require('../sessionModels');

const sessionController = {};


sessionController.isLoggedIn = (req, res, next) => {
  
  
  Session.findOne({ cookieId: req.cookies.SSID }, (err, result) => {
    if (!result) {
      res.redirect('/signup');
    }
    return next();
  });
};
  


sessionController.startSession = (req, res, next) => {
  //write code here
  Session.create({ cookieId: res.locals.userId }, (err, result) => {
    if (err) {
      return next(err);
    }
    return next();
  });
};

module.exports = sessionController;