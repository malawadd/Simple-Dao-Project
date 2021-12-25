import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
const {connectWallet, address, error, provider} = useWeb3();
console.log("👋 Address:", address)

// This is the case where the user hasn't connected their wallet
// to your web app. Let them call connectWallet.

if (!address){
  return(
    <div classname="landing">
    <h1> Welcome to SpaceDao</h1>
    <button onClick={() => connectWallet("injected")} className="btn-hero">
      conntect Wallet
    </button>
    </div>

    );
}
// This is the case where we have the user's address
  // which means they've connected their wallet to our site!


  return (
    <div className="landing">
      <h1>Welcome onBoard </h1>
    </div>
  );
};

export default App;
