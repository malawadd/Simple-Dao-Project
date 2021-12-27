import sdk from "./1-initialize-sdk.js";
import {ethers } from "ethers"; 


// This is our governance contract.
const voteModule = sdk.getVoteModule("0xC045eBEC738806fe1713D215A7a6dd69c306dd36");

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule  = sdk.getTokenModule("0xa0f29623DDD59b9F82317b9bE0cD9bA7de58e449");

(async () => {
    try {
      // Give our treasury the power to mint additional token if needed.
      await tokenModule.grantRole("minter", voteModule.address);
      
      console.log("Successfully gave vote module permissions to act on token module")
          } catch (error) {
            console.error("failed to grant vote module permissions on token module", error);
            process.exit(1);
          }
    try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
        process.env.WALLET_ADDRESS
    );
    //grab 90% of the supply we hold 
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    //transefer 90% of the supply of our voting contract 
      await tokenModule.transfer(voteModule.address, percent90);
      console.log("✅ Successfully transferred tokens to vote module")
          } catch (error) {
            console.error("failed to transfer tokens to vote module", error);
            process.exit(1);
          }
})();