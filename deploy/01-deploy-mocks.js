// The Mocks are used like copies of external contracts/protocols, like Chainlink's VRF oracle
// by creating Mocks, we are creating fake versions of the original contracts, with all the functionalities, but without using the actual blockchain
// making testing faster.

// Implementing Mocks for VRF Chainlink Coordinator V2 in order to get a random number
// Mocks should be able to be used on local testnet (hardhat)
// the VRFCoordinatorV2Address will be parameterized so to not have to change our code when deploying on rinkeby later 

// syntax following the hardhat-deploy plug-in and use of hre
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network, chainId } = require("hardhat")

const BASE_FEE = ethers.utils.parseEther("0.25") // premium fee per request
const GAS_PRICE_LINK = 1e9 // 1000000000 link per gas, calculated based on the value of gas

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  if (chainId == 1337) {
    log("You are using hardhat's network, you need Mocks. Deploying them for you...")
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    })
    log("Mocks Deployed!")
    log("---------------------------------------------")
    log("You are deploying to a local network, you'll need a local network running to interact")
    log("Please run `npx hardhat console --network localhost` to interact with the deployed smart contracts!")
    log("---------------------------------------------")
  }
}

module.exports.tags = ["all", "mocks"]