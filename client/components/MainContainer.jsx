import React, { Component } from 'react';
import RepoGrabber from './RepoGrabber.jsx';
import DataDisplay from './DataDisplay';
import CSVExport from './CSVExport';
import { ExportToCsv } from 'export-to-csv';

class MainContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: true,
      name: '',
      repos: [],
      personalFollowers: [],
      checked: new Map(),
      toBeSent: [],
      userUrl: '',
    };
    this.getFollowers = this.getFollowers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.csvExport = this.csvExport.bind(this);

  }

  getFollowers(){
    const toBeSent = [];
    if(this.state.checked.get('Your GitHub followers') === true){
      toBeSent.push(this.state.userUrl);
    }
    for(const [key, value] of this.state.checked){
      if (value===true){
        for(const repo of this.state.repos){
          if(key === repo.name){toBeSent.push(repo.stargazersUrl);}
        }
      }
    }
    this.setState({...this.state, toBeSent});
    // console.log(toBeSent);
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
        this.setState({...this.state, personalFollowers: data});
        // console.log(data);
      })
      .catch(err => console.log(err));
}


    csvExport(){
      let data = this.state.personalFollowers;
        const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Your GitHub Emails',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: false,
    filename: 'emails',
    headers: ['Username', 'Email',]
  };
 
const csvExporter = new ExportToCsv(options);
 
csvExporter.generateCsv(data);
 
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
        this.setState({...this.state, name : data.user.name, repos: data.repos, userUrl: data.user.github_followers_url});
      })
      .catch(err => console.log(err));
    //that url runs a get request on the db 
  }

  render(){ 
    console.log('state', this.state)
    let nameVar="Chief";
    if(this.state.name){nameVar = this.state.name}
    return(
      <div className="MainContainer">
        <h3 className="greeting" id='grettingID'>Hi, {`${nameVar}`}. Check out your followers below.</h3>
        <p id='greetingDetail' >Select your GitHub Followers and/or your Repo Stargazers</p>
        <RepoGrabber 
          id='repoGrabberID'
          repos={this.state.repos}
          personalFollowers={this.state.personalFollowers}
          getFollowers={this.getFollowers}
          handleChange={this.handleChange}
          checkedItems={this.state.checked}
          userUrl={this.state.userUrl}
        />
        <DataDisplay 
          id='dataDisplayID'
          personalFollowers={this.state.personalFollowers}
        />
        <CSVExport
          id="csvExportID" 
          csvExport={this.csvExport}
        />
      </div>
    );
  }
}
export default MainContainer;