import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";

//import third web
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

//chain to support 
const supportedChainIds = [4];

// supported walledts 
const connectors = {
  injected:{},
};

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider 
    connectors = {connectors}
    supportedChainIds={supportedChainIds}>
    <App />
    </ThirdwebWeb3Provider>
    
  </React.StrictMode>,
  document.getElementById("root")
);
