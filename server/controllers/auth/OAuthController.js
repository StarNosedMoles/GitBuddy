const fetch = require('node-fetch');

const OAuthController = {};

OAuthController.getCode = (req, res, next) => {
    
  const parameters = {
    //encrypt client id
    client_id: '13e0e054832447d72513',
    //encrypt client secret
    client_secret: '2acec6f07e526065d5bee5c0952d80a59f22814e',
    code: req.query.code,
  };

  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify(parameters),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {


      res.locals.accessToken = data.access_token;
      return next();
    })
    .catch((err) => null);

};

OAuthController.getUser = (req, res, next) => {
  let code;

  if (res.locals.accessToken) code = res.locals.accessToken;
  else code = req.cookies.SSID;

  
  fetch('https://api.github.com/user', {
    headers: {Authorization: `token ${code}`}
  })
    .then(data => {
      return data.json();
    })
    .then(data => {
      res.locals.user = data;
 
      return next();
    })
    .catch(err => {
      return next({
        message: 'Error getting user data in getUser',
        error: err
      });
    });
};



module.exports = OAuthController;