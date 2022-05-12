# Learnweb3.io - Chainlink

Makes use of Chainlink VRF's to get random numbers cryptographically proofable.

The contract of the Game inherits from `@chainlink/contracts/src/v0.8/VRFConsumerBase`

```
contract RandomWinnerGame is VRFConsumerBase, ...
```

It's constructor receives the addresses of VRFCoordinator contract and the LINK token, besides a keyHash, ID of public key against which randomness is generated, and the amount of LINK to send with the request

```
constructor(address vrfCoordinator, address linkToken,
bytes32 vrfKeyHash, uint256 vrfFee)
VRFConsumerBase(vrfCoordinator, linkToken) {
    keyHash = vrfKeyHash;
    fee = vrfFee;
    gameStarted = false;
}
```

Whe the game finishes, the function `requestRandomness` is called in order to ask for a random number:

```
function getRandomWinner() private returns (bytes32 requestId) {
    // LINK is an internal interface for Link token found within the VRFConsumerBase
    // Here we use the balanceOF method from that interface to make sure that our
    // contract has enough link so that we can request the VRFCoordinator for randomness
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
    // Make a request to the VRF coordinator.
    // requestRandomness is a function within the VRFConsumerBase
    // it starts the process of randomness generation
    return requestRandomness(keyHash, fee);
}
```

When VRFCoordinator receives a valid VRF proof, it calls fulfillRandomness, inherited from VRFConsumerBase:

```
function fulfillRandomness(bytes32 requestId, uint256 randomness) internal virtual override  {
    // We want out winnerIndex to be in the length from 0 to players.length-1
    // For this we mod it with the player.length value
    uint256 winnerIndex = randomness % players.length;
    // get the address of the winner from the players array
    address winner = players[winnerIndex];
    // send the ether in the contract to the winner
    (bool sent,) = winner.call{value: address(this).balance}("");
    require(sent, "Failed to send Ether");
    // Emit that the game has ended
    emit GameEnded(gameId, winner,requestId);
    // set the gameStarted variable to false
    gameStarted = false;
}
```

At the contract deployment process, we execute the step of verifying it:

```javascript
await deployedRandomWinnerGameContract.deployed();
// Wait for etherscan to notice that the contract has been deployed
await sleep(30000);
// Verify the contract after deploying
await hre.run("verify:verify", {
  address: deployedRandomWinnerGameContract.address,
  constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE],
});
```
