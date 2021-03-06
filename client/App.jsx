import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';
 

// import ' stylesheet';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
    };
  }
  
  render(){
    if(this.state.loggedIn === false){
      return (
        <div className="oauth">
          {/* oauth button */}
        </div>
      );
    }else{
      return (
        <div className='loggedIn'>
          {/* <mainContainer> */}
        </div>
      );
    }
  
  }
}
export default App;