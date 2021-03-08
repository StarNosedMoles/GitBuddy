import React, { Component } from 'react';

function CSVExport(props){
  return(
    <button onClick={()=>props.csvExport()}>Get emails as CSV</button>
  );
}

export default CSVExport;