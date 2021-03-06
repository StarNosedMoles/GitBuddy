import React, { Component } from 'react';


function DataDisplay(props){
  console.log('props: ', props.checkedItems)
  const repoObj = props.checkedItems
  console.log('repoObj:', repoObj)
  const repoArray = [];
  for(const [key, value] of repoObj){
    console.log("prop in loop", key)
    if (value){
      repoArray.push(<p>{key}</p>)

    }
  }

  console.log('repoArray: ', repoArray)
  // const items = []
  // props.fakeCheckedItems.forEach(el=>{
  //   items.push(<p>{el}</p>)
  // })
  return(<p>Data Display, howdy assholes: {repoArray}</p>);
}

export default DataDisplay;