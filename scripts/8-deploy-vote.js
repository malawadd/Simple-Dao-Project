import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const app = sdk.getAppModule("0xEddd0510F9fF724BF8C55DaFe1C3C6C81eb02E37");

( async () => {
    try {
        const voteModule = await app.deployVoteModule({
            // Give your governance contract a name.
            name: "SpadeDao Proposals",
            //// This is the location of our governance token, our ERC-20 contract!
            votingTokenAddress : "0xa0f29623DDD59b9F82317b9bE0cD9bA7de58e449",
            // After a proposal is created, when can members start voting?
            // For now, we set this to immediately.
            proposalStartWaitTimeInSeconds: 0,

            // How long do members have to vote on a proposal when it's created?
            // Here, we set it to 24 hours (86400 seconds)
            proposalVotingTimeInSeconds: 24 * 60 * 60,

            //n order for a proposal to pass, a minimum x % of token must be used in the vote
            votingQuorumFraction: 0,

            // What's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I set it to 0. Meaning no tokens are required for a user to be allowed to
            // create a proposal.
            minimumNumberOfTokensNeededToPropose:"0",

        });
        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
          );
    } catch (error) {
        console.log("Failed to deploy vote  Module", error)
    }
})()