import React, { Component } from 'react';


function Repo(props){
  return(
<div className={props.className}>
  <li>
    <input type={props.type} id={props.id} name={props.name}></input>
    <label htmlFor={props.for}>{props.insideText}</label>
    </li>
    </div>
  )
}

export default Repo