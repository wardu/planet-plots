// The Mocks are used like copies of external contracts/protocols, like Chainlink's VRF oracle
// by creating Mocks, we are creating fake versions of the original contracts, with all the functionalities, but without using the actual blockchain
// making testing faster.

// Implementing Mocks for VRF Chainlink Coordinator V2 in order to get a random number
// Mocks should be able to be used on local testnet (hardhat)
// the VRFCoordinatorV2Address will be parameterized so to not have to change our code when deploying on rinkeby later 

// syntax following the hardhat-deploy plug-in and use of hre
//const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")

const BASE_FEE = ethers.utils.parseEther("0.25") // premium fee per request
const GAS_PRICE_LINK = 1e9 // 1000000000 link per gas, calculated based on the value of gas

async function main () {

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  if (network.name === "hardhat") {
    console.warn("You are using hardhat's network, you need Mocks. Deploying them for you...");
    const VRF = await ethers.getContractFactory("VRFCoordinatorV2Mock");
    const MockCoordinator = await VRF.deploy(BASE_FEE,GAS_PRICE_LINK);
    await MockCoordinator.deployed();
    console.log("Mocks Deployed!");
    console.log("---------------------------------------------");
    console.log("You are deploying to a local network, you'll need a local network running to interact");
    console.log("Please run `npx hardhat console --network localhost` to interact with the deployed smart contracts!");
    console.log("---------------------------------------------");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });