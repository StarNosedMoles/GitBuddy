import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';


//GitHub_Octocat_URL: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'

function Login(props){
  const oAuthUrl = 'https://github.com/login/oauth/authorize?client_id=13e0e054832447d72513&redirect_uri=http://localhost:3000/login';
  return (
    <div className="oauth">
      <a href={`${oAuthUrl}`} ><img src={ require('../assets/Octocat.jpg') }
        className="octoCat" 
        alt='GitHub Octocat' 
      ></img></a> 
    </div>
  );
}

export default Login;
  
