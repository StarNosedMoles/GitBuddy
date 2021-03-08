import React, { Component } from 'react';

function DataDisplay(props){
  // console.log('props: ', props.personalFollowers)
  const repoObj = props.personalFollowers;
  // console.log('repoObj:', repoObj)
  const repoArray = [];
  for(const el of repoObj){
    // console.log("prop in loop", key)
    if(el.email){
    repoArray.push(<p>Name: {el.user}, Email: {el.email} </p>)    
    }else{
      repoArray.push(<p>Name: {el.user}, Email: {"private"} </p>)
    }
  }

  // console.log('repoArray: ', repoArray)
  // const items = []
  // props.fakeCheckedItems.forEach(el=>{
  //   items.push(<p>{el}</p>)
  // })

  return(
    <div className="dataDisplay">
      <p>Your database holds {`${repoArray.length}`} names</p>
      <p>{repoArray}</p>
    </div>  
  );
}

export default DataDisplay;