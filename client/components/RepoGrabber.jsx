import React, { Component } from 'react';
import Repo from './Repo';

function RepoGrabber(props){
  let repoArray =[];
  //another with details about repo
  for(let i=0;i<props.repos.length;i++){
    repoArray.push(<Repo
      key={`repo${i}`} 
      className={`repo`}
      id={`repo${i}`}
      name={`repo${i}`}
      value={true}
      for={`repo${i}`}
      type="checkbox"
      insideText={`${props.repos[i].name}`}
    />)
  }
  console.log(repoArray)
  return(
    <div className="repoGrabber" >
      <ul>
        {repoArray}
      </ul>
      <button onClick={(e)=> props.getFollowers(e)}>Get My Followers!</button>
    </div>
  );
}

export default RepoGrabber;