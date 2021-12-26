import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";


const app = sdk.getAppModule("0xEddd0510F9fF724BF8C55DaFe1C3C6C81eb02E37");

( async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            //collection name 
            name: "SpadeDao Memebership",
            description : "Space Rocket Membership",
            image: readFileSync("scripts/assets/space.jpg") ,
            // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the module.
            // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
             // you can set this to your own wallet address if you want to charge for the drop.
             primarySaleRecipientAddress: ethers.constants.AddressZero,

        });
        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
          );
          console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
          );

    } catch (error) {
        console.log("Failed to deploy bundleDrop Module", error)
    }
})()