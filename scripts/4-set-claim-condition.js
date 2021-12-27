import sdk from "./1-initialize-sdk.js"

const bundleDrop = sdk.getBundleDropModule("0x4bECadC408F16bA2F7BB86A7d3450eF78De39C2E");

(async () => {
    try {
      const claimConditionFactory = bundleDrop.getClaimConditionFactory();
      // Specify conditions.
      claimConditionFactory.newClaimPhase({
        startTime: new Date(),
        maxQuantity: 50,
        maxQuantityPerTransaction: 1,
      });
      
      
      await bundleDrop.setClaimCondition(0, claimConditionFactory);
      console.log("✅ Sucessfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error) {
      console.error("Failed to set claim condition", error);
    }
  })()