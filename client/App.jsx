import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';

import Login from './components/Login.jsx';
import MainContainer from './components/MainContainer.jsx';

import './stylesheets/styles.css';

class App extends Component {
  render(){
    return (
      <div className="router">

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
  }
}



export default App;