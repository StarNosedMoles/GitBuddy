import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';


class MainContainer extends Component {
  constructor(props){
    super(props);
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