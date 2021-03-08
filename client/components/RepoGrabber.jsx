import React, { Component } from "react";
import Repo from "./Repo";
import Checkbox from "./Checkbox";

function RepoGrabber(props) {
  let repoArray = [];
  //another with details about repo
  for (let i = 0; i < props.repos.length; i++) {
    repoArray.push({
      name: props.repos[i].name,
      key: `checkBox${i}`,
      label: `Check Box ${i}`,
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
        Get My Followers!
      </button>
    </React.Fragment>
  );
}

export default RepoGrabber;
