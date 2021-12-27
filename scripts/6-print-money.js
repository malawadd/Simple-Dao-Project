import sdk from "./1-initialize-sdk.js";
import {ethers } from "ethers"; 


// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule  = sdk.getTokenModule("0xa0f29623DDD59b9F82317b9bE0cD9bA7de58e449");

(async () => {
    try {
      // What's the max supply you want to set? 1,000,000 is a nice number!
      const amount = 1_000_000;
      // We use the util function from "ethers" to convert the amount
      // to have 18 decimals (which is the standard for ERC20 tokens).
      const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18)
      // Interact with your deployed ERC-20 contract and mint the tokens!
      await tokenModule.mint(amountWith18Decimals);
      const totalSupply = await tokenModule.totalSupply();

            console.log(
              "✅ there is now ",
              ethers.utils.formatUnits(totalSupply, 18),
              "$SPACECAT in circulation"
            );
          } catch (error) {
            console.error("failed to print money", error);
          }
})();