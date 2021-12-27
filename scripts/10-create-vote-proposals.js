import sdk from "./1-initialize-sdk.js";
import {ethers } from "ethers"; 


// This is our governance contract.
const voteModule = sdk.getVoteModule("0xC045eBEC738806fe1713D215A7a6dd69c306dd36");

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule  = sdk.getTokenModule("0xa0f29623DDD59b9F82317b9bE0cD9bA7de58e449");

(async () => {
    try {
    const amount = 240_000;

    await voteModule.propose(
        "Should the DAO mint an additional " + amount + "token into treasury",
        [
            {
            // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
          // to send in this proposal. In this case, we're sending 0 ETH.
          // We're just minting new tokens to the treasury. So, set to 0.
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            // We're doing a mint! And, we're minting to the voteModule, which is
            // acting as our treasruy.
            "mint",
            [
                voteModule.address,
                ethers.utils.parseUnits(amount.toString(),18),
            ]

          ),
          // Our token module that actually executes the mint.
          toAddress: tokenModule.address,

            }
        ]
    )

      console.log("✅ Successfully created proposal to mint tokens")
          } catch (error) {
            console.error("failed toto create first proposal", error);
            process.exit(1);
          }
          try {
            const amount = 6_000;
            // create a proposal to send token to ourselves 
        
            await voteModule.propose(
                "Should the DAO transefer " + amount + "token from treasury to" +
                process.env.WALLET_ADDRESS + " for being the only one here?",
                [
                    {
                    // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                  // to send in this proposal. In this case, we're sending 0 ETH.
                  // We're just minting new tokens to the treasury. So, set to 0.
                  nativeTokenValue: 0,
                  transactionData: tokenModule.contract.interface.encodeFunctionData(
                    // We're doing a mint! And, we're minting to the voteModule, which is
                    // acting as our treasruy.
                    "transfer",
                    [
                        voteModule.address,
                        ethers.utils.parseUnits(amount.toString(),18),
                    ]
        
                  ),
                  // Our token module that actually executes the mint.
                  toAddress: tokenModule.address,
        
                    }
                ]
            )
        
              console.log("✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!")
                  } catch (error) {
                    console.error("failed toto create second proposal", error);
                    process.exit(1);
                  }
})();