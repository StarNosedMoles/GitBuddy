import React, { Component } from 'react';
import RepoGrabber from './RepoGrabber.jsx';

class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
    };
    // this.logger = this.logger.bind(this)
  }

  render(){
    return(
      <div className="MainContainer">
        <RepoGrabber />
      </div>
    );
  }
}
export default MainContainer;