import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

// We instatiate the sdk on Rinkeby.
const sdk = new ThirdwebSDK("rinkeby");

/// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule("0x4bECadC408F16bA2F7BB86A7d3450eF78De39C2E")

const App = () => {
const {connectWallet, address, error, provider} = useWeb3();
console.log("👋 Address:", address)

// The signer is required to sign transactions on the blockchain.
// Without it we can only read data, not write.
const signer = provider ? provider.getSigner() : undefined;

// State variable for us to know if user has our NFT.
const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
 // isClaiming lets us easily keep a loading state while the NFT is minting.
const [isClaiming, setIsClaiming] = useState(false);

useEffect(() => {
  // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer);
}, [signer])

useEffect(() => {
  // If they don't have an connected wallet, exit!
  if (!address){
    return;
  }

   // Check if the user has the NFT by using bundleDropModule.balanceOf
   return bundleDropModule.balanceOf(address, "0").then((balance) => {
     if (balance.gt(0)) {
       setHasClaimedNFT(true);
       console.log("🌟 this user has a membership NFT!")
     } else {
       setHasClaimedNFT(false)
       console.log("😭 this user doesn't have a membership NFT.")
     }
   })
   .catch((error)=> {
     setHasClaimedNFT(false);
     console.error("failed to nft balance", error);
   })
}, [address]);



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

// if the user has claimed our memebership 
if (hasClaimedNFT) {
  return (
    <div className="member-page">
      <h1>🚀SpaceDAO Member Page </h1>
      <p>🎉Congratulations on being a member🎉</p>
    </div>
  );
};

const mintNFT = () =>{
  setIsClaiming(true);
  // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
  bundleDropModule.claim("0", 1)
  .catch((err)=>{
    console.error("failed to claim", err);
    setIsClaiming(false);
  })
  .finally(() =>{
    //stop loading state
    setIsClaiming(false);
    //set claim state 
    setHasClaimedNFT(true);
    // Show user their fancy new NFT!
    console.log(
      `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
    );
  });
}

  return (
    // <div className="landing">
    //   <h1>Welcome onBoard </h1>
    // </div>

    <div className="mint-nft">
      <h1> Mint your SpaceDao membership</h1>
      <button disabled ={isClaiming}
      onClick={() => mintNFT()}>
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
