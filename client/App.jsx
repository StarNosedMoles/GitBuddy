import React, { Component } from 'react';
import { Switch, Route, Router, Link, useLocation } from 'react-router-dom';

import Login from './components/Login.jsx';
import MainContainer from './components/MainContainer.jsx';

// import ' stylesheet';

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
              // path="/main"
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











//   logger(){
//     this.setState({...this.state, loggedIn: true})
//   }

//   render(){
//     console.log('first state', this.state)
//     if(this.state.loggedIn === false){
//       const oAuthUrl = 'https://github.com/login/oauth/authorize?client_id=13e0e054832447d72513&redirect_uri=http://localhost:3000/login';
//       return (
//         <div className="oauth">
//           <a href={`${oAuthUrl}`} ><img src='https://github.githubassets.com/images/modules/logos_page/Octocat.png' 
//             alt='GitHub Octocat' 
//             style={{height: '200px', width: '250px', marginLeft: '25%'}}
//             onClick={() => this.logger()}></img></a> 
//         </div>
//       )
//     }else if(this.state.loggedIn){
//       console.log("logged in")
//       console.log(this.state)
//       return (
//         <div className='loggedIn'>
//           <MainContainer loggedIn={this.state.loggedIn} />
//         </div>
//       );
//     }
  
//   }
// }
export default App;