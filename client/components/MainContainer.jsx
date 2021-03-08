import React, { Component } from 'react';
import RepoGrabber from './RepoGrabber.jsx';
import DataDisplay from './DataDisplay'

class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      name: '',
      // repos: [{name: "myFirst Repo", followers: [1,2,3,4,5]},
      repos: [],
      personalFollowers: [{ name : 'Kushal', email: 'fakeemail@email.email' },  
        { name : 'David', email: 'fakeemail@email.email' },  
        { name : 'Joseph', email: 'fakeemail@email.email' },  
        { name : 'Greg', email: 'fakeemail@email.email' },],
      checked: new Map(),
      toBeSent: new Map(),
    };
    this.getFollowers = this.getFollowers.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  getFollowers(){
    const toBeSent = [];
    for(const [key, value] of this.state.checked){
      if (value===true){
        for(const repo of this.state.repos){
          if(key === repo.name){toBeSent.push(repo.stargazersUrl);}
        }
      }
    }
    this.setState({...this.state, toBeSent});
    console.log(toBeSent);
    // fetch request to db for user's repo follower data should go here
    fetch('/repoPost', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({urls: toBeSent})
    })
      .then((res) => res.json())
      .then((data) => {
        // this.setState({...this.state, personalFollowers: data.followers})
        console.log(data);
      })
      .catch(err => console.log(err));
  }
    

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({...this.state, checked: prevState.checked.set(item, isChecked) }));
    // console.log(this.state)
  }

  componentDidMount () {
    //db fetch request
    fetch('/getUser')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({...this.state, name : data.user.name, repos: data.repos});
      })
      .catch(err => console.log(err));
    //that url runs a get request on the db 
  }

  render(){
    return(
      <div className="MainContainer">
        <h3 className="greeting">Hi, {this.state.name}.</h3>
        <p>Select your GitHub Followers and/or your Repo Stargazers</p>
        <RepoGrabber 
          repos={this.state.repos}
          personalFollowers={this.state.personalFollowers}
          getFollowers={this.getFollowers}
          handleChange={this.handleChange}
          checkedItems={this.state.checked}
        />
        <DataDisplay 
          personalFollowers={this.state.personalFollowers}
        />
      </div>
    );
  }
}
export default MainContainer;