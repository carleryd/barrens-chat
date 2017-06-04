import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

// Remove console log in production mode
if(process.env.NODE_ENV == "production") {
  // $FlowFixMe
  console.log = () => {}; 
}

ReactDOM.render(
  <App />,
  document.getElementById("react-root")
);

