import sdk from "./1-initialize-sdk.js";


const app = sdk.getAppModule("0xEddd0510F9fF724BF8C55DaFe1C3C6C81eb02E37");

(async () => {
    try {
      // Deploy a standard ERC-20 contract.
      const tokenModule = await app.deployTokenModule({
        // What's your token's name? Ex. "Ethereum"
                name: "SpaceDao Governace Token" ,
                symbol: "SPACECAT",
            });
            console.log(
              "✅ Successfully deployed token module, address:",
              tokenModule.address,
            );
          } catch (error) {
            console.error("failed to deploy token module", error);
          }
})();