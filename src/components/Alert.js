import React from "react";

function Alert( { display } ) {

  if (!display) {
    return null;
  }

  return (
    <p>{ display }</p>
  )
}

export default Alert;