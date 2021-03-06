import React, { Component } from 'react';
import RepoGrabber from './RepoGrabber.jsx';
import DataDisplay from './DataDisplay'

class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      repos: [{name: "myFirst Repo", followers: [1,2,3,4,5]},
      {name: "my Onlyfans Repo", followers: [1,2,3,4,5]},
      {name: "I got another repo", followers: [1,2,3,4,5]}],
      personalFollowers: ['Amy', 'Beth', 'Carl', 'Drago']
    };
    this.getFollowers = this.getFollowers.bind(this);
  }

  getFollowers(checked){
    //db fetch request; find 
    //fetch("/datadisplay")
    console.log(checked);
    checked.persist();
  }

  componentDidMount () {
    //db fetch request
    // fetch("/initialLoad")
    // .then((res) => res.json())
    // .then((data) => this.setState({...this.state, repos: [...data]}))
    // .catch(err => console.log(err));
    //that url runs a get request on the db 
  }

  render(){
    return(
      <div className="MainContainer">
        <RepoGrabber 
        repos={this.state.repos}
        personalFollowers={this.state.personalFollowers}
        getFollowers={this.getFollowers}/>
        <DataDisplay />
      </div>
    );
  }
}
export default MainContainer;