import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';

import MainContainer from './components/MainContainer.jsx';

// import ' stylesheet';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,

    };
  }
  render(){
    console.log('first state', this.state)
    if(this.state.loggedIn === false){
      const oAuthUrl = 'https://github.com/login/oauth/authorize?client_id=13e0e054832447d72513&redirect_uri=http://localhost:3000/login';
      return (
        <div className="oauth">
          <a href={`${oAuthUrl}`} ><img src='https://github.githubassets.com/images/modules/logos_page/Octocat.png' 
          alt='GitHub Octocat' 
          style={{height: '200px', width: '250px', marginLeft: '25%'}}></img></a> 
          <button onClick={() => this.setState({...this.state, loggedIn: true})}>Click here to login</button>
        </div>
      )
    }else if(this.state.loggedIn){
      console.log("logged in")
      console.log(this.state)
      return (
        <div className='loggedIn'>
          <MainContainer loggedIn={this.state.loggedIn} />
        </div>
      )
    }
  
  }
}
export default App;