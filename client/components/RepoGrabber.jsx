import React, { Component } from 'react';
import checkboxes from './configs/config.jsx';
import Checkbox from './Checkbox'

function RepoGrabber(props){
  console.log(props)
    return (
      <React.Fragment>
        {
          checkboxes.map(item => (
            <label key={item.key}>
              {item.name}
              <Checkbox name={item.name} checked={props.checkedItems.get(item.name)} onChange={props.handleChange} />
            </label>
          ))
        }
      </React.Fragment>
    );
  }

export default RepoGrabber;