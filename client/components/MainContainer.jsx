import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';


class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
    };
    // this.logger = this.logger.bind(this)
  }

  render(){
    console.log("rendering maincontainer");
    return(
      <div>
        <p>Howdy</p>
      </div>
    );
  }
}
export default MainContainer;