import sdk from "./1-initialize-sdk.js";
import {readFileSync} from "fs";

const bundleDrop = sdk.getBundleDropModule("0x4bECadC408F16bA2F7BB86A7d3450eF78De39C2E");

(async () => {
    try{
        await bundleDrop.createBatch([
            {
                name: "cat in space" ,
                description: "Grant Access to SpaceDao",
                image: readFileSync("scripts/assets/Space.jpg")

            },
        ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error){
        console.error("Failed to create the new NFT", error);
    }
})()
