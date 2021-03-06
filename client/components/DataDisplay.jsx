import React, { Component } from 'react';


function DataDisplay(props){
  console.log('props: ', props.fakeCheckedItems)
  const fakeObj = props.fakeCheckedItems
  console.log('fakeObj:', fakeObj)
  const fakeArray = [];
  for(const prop in fakeObj){
    if (fakeObj[prop]){

      fakeArray.push(<p>{prop}</p>)
    }
  }

  console.log(fakeArray)
  // const items = []
  // props.fakeCheckedItems.forEach(el=>{
  //   items.push(<p>{el}</p>)
  // })
  return(<p>Data Display, howdy assholes: {fakeArray}</p>);
}

export default DataDisplay;