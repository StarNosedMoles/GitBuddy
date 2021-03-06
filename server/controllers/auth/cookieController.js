const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  //set cookie using userId
  res.cookie('SSID', res.locals.userId, { httpOnly: true });
  return next();
};

module.exports = cookieController;