import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule  = sdk.getBundleDropModule("0x4bECadC408F16bA2F7BB86A7d3450eF78De39C2E");

// This is the address to our ERC-20 token contract.
const tokenModule  = sdk.getTokenModule("0xa0f29623DDD59b9F82317b9bE0cD9bA7de58e449");


(async () => {
    try {
        // Grab all the addresses of people who own our membership NFT, which has 
        // a tokenId of 0.
      const walletAddress = await bundleDropModule.getAllClaimerAddresses("0")

      if(walletAddress.length === 0) {
        console.log(
            "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!",
          );
        process.exit(0);
      }
       // Loop through the array of addresses.
       const airdropTargets = walletAddress.map((address) =>{
           // Pick a random # between 1000 and 10000.
           const randomAmount = Math.floor(Math.random() * (10000-1000+1) + 1000)
           console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

           // Set up the target.
           const airdropTarget = {
               address,
               // Remember, we need 18 decimal placees!
               amount:ethers.utils.parseUnits(randomAmount.toString(),18),
           };
           return airdropTarget;
       });

      console.log("👋 tarting airdrop...");
      await tokenModule.transferBatch(airdropTargets);
      console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
          } catch (error) {
            console.error("Failed to airdrop tokens", error);
          }
})();
