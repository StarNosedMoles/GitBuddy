import React, { Component } from "react";
import Repo from "./Repo";
import Checkbox from "./Checkbox";

function RepoGrabber(props) {
  // console.log('repog', props)
  let repoArray = [];
  repoArray.push({name: 'Your GitHub followers',
  key: `checkBox0'`,
  label:`Check Box 0`,
  url: props.userUrl,
});
  //another with details about repo
  for (let i = 0; i < props.repos.length; i++) {
    repoArray.push({
      name: props.repos[i].name,
      key: `checkBox${i+1}`,
      label: `Check Box ${i+1}`,
      url: props.repos[i].stargazersUrl,
    });
  }
  // console.log(props);
  return (
    <React.Fragment>
      {repoArray.map((item) => (
        <label className="checkBox" key={item.key}>
          {item.name}
          <Checkbox
            name={item.name}
            checked={props.checkedItems.get(item.name)}
            onChange={props.handleChange}
          />
        </label>
      ))}
      <button className="submitButton" onClick={() => props.getFollowers()}>
        Save Followers to Database
      </button>
    </React.Fragment>
  );
}

export default RepoGrabber;
