const { network, ethers } = require ("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  
  let vrfCoordinatorV2Address, subscriptionId
  const gasLane = networkConfig[chainId]["gasLane"]
  const mintFee = networkConfig[chainId]["mintFee"]
  const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
  
  
  // this if statement allows to pick the arguments from the Mock VRFCoordinatorV2 => address of the contract + create subscription Id
  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transactionResponse.wait(1)
    subscriptionId = transactionReceipt.events[0].args.subId
  } else {
  vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
  const subscriptionId = networkConfig[chainId]["subscriptionId"]
  
  }
  
  const params = [vrfCoordinatorV2Address, subscriptionId, gasLane, mintFee, callbackGasLimit]
  const marsToken = await deploy("Mars", {
    from: deployer,
    args: params,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(marsToken.address, args)
  }
  log("--------------------------------")
  }


  module.exports.tags = ["all", "marsToken"]