//const path = require("path")


vrfCoordinatorV2 =

async function main() {
    // first, we get the address who will deploy the contract

    const [deployer] = await ethers.getSigners();
    console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
    );
    
    //then we deploy the contract
    const Mars = await ethers.getContractFactory("MarsNFT");
    const marsToken = await Mars.deploy();

    address vrfCoordinatorV2,
    uint64 subscriptionId,
    bytes32 gasLane, // keyHash
    uint256 mintFee,
    uint32 callbackGasLimit) 
// need to add the parameters into the constructor above in the deploy()

    await marsToken.deployed();

    console.log("Our Plot On Mars NFT address is:", marsToken.address);
    console.log("Deployer's account balance:", (await deployer.getBalance()).toString());

    

}

//return the asynchronous main function, throws error if problem
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
