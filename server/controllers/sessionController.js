const session = require('../data/sessionModel.js');

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  // Session.findOne({ cookieId: req.cookies.SSID }, (err, result) => {
  //   if (!result) {
  //     res.redirect();
  //   }
  //   return next();
  // });

  return next();
};

sessionController.startSession = (req, res, next) => {
  //write code here
  // Session.create({ cookieId: res.locals.userId }, (err, result) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   return next();
  // });

  return next();
};

module.exports = sessionController;
