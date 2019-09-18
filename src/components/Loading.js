import React from "react";
import spinner from "./loading.svg";

function Loading() {
  return (
    <img src={spinner} alt="spinner" />
  );
}

export default Loading;