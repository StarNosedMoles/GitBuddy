import React, { Component } from 'react';

function CSVExport(props){
  return(
    <button className='csvButton'onClick={()=>props.csvExport()}>Get emails as CSV</button>
  );
}

export default CSVExport;