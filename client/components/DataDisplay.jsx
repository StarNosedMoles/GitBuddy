import React, { Component } from 'react';


function DataDisplay(props){
  console.log('props: ', props.personalFollowers)
  const repoObj = props.personalFollowers;
  // console.log('repoObj:', repoObj)
  const repoArray = [];
  for(const el of repoObj){
    // console.log("prop in loop", key)
    repoArray.push(<p>{el.name}: {el.email}</p>)    
  }

  // console.log('repoArray: ', repoArray)
  // const items = []
  // props.fakeCheckedItems.forEach(el=>{
  //   items.push(<p>{el}</p>)
  // })
  return(
    <div className="dataDisplay">
      <p>Data Display, howdy assholes: {repoArray}</p>
    </div>  
  );
}

export default DataDisplay;