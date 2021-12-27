import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
const tokenModule  = sdk.getTokenModule("0xa0f29623DDD59b9F82317b9bE0cD9bA7de58e449");

(async () => {
    try {
        console.log(
            "👀 Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
            );
        
        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);

        console.log(
            "🎉 Roles after revoking ourselves",
            await tokenModule.getAllRoleMembers()
            );
      console.log("✅ Successfully revoked our superpowers from the ERC-20 contract")

                  } catch (error) {
                    console.error("Failed to revoke ourselves from the DAO treasury", error); 
                  }
})();