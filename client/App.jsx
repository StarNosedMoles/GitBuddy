import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';

import Login from './components/Login.jsx';
import MainContainer from './components/MainContainer.jsx';

import './stylesheets/styles.css';

class App extends Component {
<<<<<<< HEAD
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
  
=======
  render(){
    return (
      <div className="router">
        <h1>gitBuddy</h1>

        <main>

          <Switch >
            <Route
              exact
              path="/"
              component={
                () => <Login />
              }>         
            </Route>   
            <Route
              exact
              path="/main"
              component={
                () => <MainContainer />
              }>         
            </Route>        
          </Switch>
        </main>
      </div>
    );
>>>>>>> e8a1bc7d50c3e75b47c016488ae2a884ecc78dc5
  }
}



export default App;