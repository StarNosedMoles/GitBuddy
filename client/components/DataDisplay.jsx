import React, { Component } from 'react';
// import ReactScrollbar from 'react-scrollbar-js';
// import PropTypes from 'prop-types';
// var React = require('react');
// var ReactDOM = require('react-dom');
// var ScrollArea = require('react-scrollbar');
function DataDisplay(props){
  // console.log('props: ', props.personalFollowers)
  const repoObj = props.personalFollowers;
  // console.log('repoObj:', repoObj)
  const repoArray = [];
  for(const el of repoObj){
    // console.log("prop in loop", key)
    repoArray.push(<p>{el}</p>)    
  }

  // console.log('repoArray: ', repoArray)
  // const items = []
  // props.fakeCheckedItems.forEach(el=>{
  //   items.push(<p>{el}</p>)
  // })
  const myScrollbar = {
    width: 400,
    height: 400,
  };
  return(
    <div className="dataDisplay">
      <ReactScrollbar style={myScrollbar}>
        <div className="should-have-a-children scroll-me">
          <p>And Now</p>
          <p>You Can Put</p>
          <p>A Long Content Here</p>
        </div>
      </ReactScrollbar>
      <p>Your database holds {`${repoArray.length}`} names</p>
      <p>{repoArray}</p>
    </div>  
  );
}

export default DataDisplay;