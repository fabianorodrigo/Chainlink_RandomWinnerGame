const {ethers, BigNumber} = require("hardhat");

const RANDOM_WINNER_GAME_ADDRESS = "0xF948f7a0173864f168E895E5Ab19a718040047a0";

// valores obtidos em: https://docs.chain.link/docs/vrf-contracts/v1/#polygon-matic-mumbai-testnet
const LINK_TOKEN = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const VRF_COORDINATOR = "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255";
const KEY_HASH =
  "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4";
const FEE = ethers.utils.parseEther("0.0001");
module.exports = {
  LINK_TOKEN,
  VRF_COORDINATOR,
  KEY_HASH,
  FEE,
  RANDOM_WINNER_GAME_ADDRESS,
};
