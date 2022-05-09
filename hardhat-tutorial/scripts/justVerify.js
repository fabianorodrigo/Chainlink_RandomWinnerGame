const {ethers} = require("hardhat");
require("dotenv").config({path: ".env"});
require("@nomiclabs/hardhat-etherscan");

const {
  FEE,
  VRF_COORDINATOR,
  LINK_TOKEN,
  KEY_HASH,
  RANDOM_WINNER_GAME_ADDRESS,
} = require("../constants");

async function main() {
  // print the address of the deployed contract
  console.log("Verify Contract Address:", RANDOM_WINNER_GAME_ADDRESS);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: RANDOM_WINNER_GAME_ADDRESS,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
