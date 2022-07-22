//const path = require("path")

const { networkConfig } = require("../../helper-hardhat-config.js")
const { network, ethers } = require("hardhat")
const verify = require("../utils/verify")
require("dotenv").config()

const BASE_FEE = ethers.utils.parseEther("0.25") // premium fee per request
const GAS_PRICE_LINK = 1e9 // 1000000000 link per gas, calculated based on the value of gas
const FUND_AMOUNT = "1000000000000000000000"

async function main() {
    // first, we get the address who will deploy the contract

    const [deployer] = await ethers.getSigners()
    const chainId = network.config.chainId
    console.log(chainId)

    console.log("Deploying the contracts with the account:", await deployer.getAddress())

    // then get the mock if we are on hardhat, otherwise get the subscriptionId and contract's address from
    if (chainId === 1337) {
        console.warn("You are using hardhat's network, you need Mocks. Deploying them for you...")
        const VRF = await ethers.getContractFactory("VRFCoordinatorV2Mock")
        const MockCoordinator = await VRF.deploy(BASE_FEE, GAS_PRICE_LINK)
        await MockCoordinator.deployed()
        console.log("Mocks Deployed!")
        console.log("---------------------------------------------")
        console.log(
            "You are deploying to a local network, you'll need a local network running to interact"
        )
        console.log(
            "Please run `npx hardhat console --network localhost` to interact with the deployed smart contracts!"
        )
        console.log("---------------------------------------------")

        vrfCoordinatorV2Address = MockCoordinator.address
        console.log(vrfCoordinatorV2Address)

        const tx = await MockCoordinator.createSubscription()
        const txReceipt = await tx.wait(1)
        subscriptionId = txReceipt.events[0].args.subId
        await MockCoordinator.fundSubscription(subscriptionId, FUND_AMOUNT)
        console.log("Mocks funded")
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }

    const args = [
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId].gasLane,
        networkConfig[chainId].mintFee,
        networkConfig[chainId].callbackGasLimit,
    ]

    //then we deploy the contract
    const marsFactory = await ethers.getContractFactory("MarsNFT")
    const marsToken = await marsFactory.deploy(
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId].gasLane,
        networkConfig[chainId].mintFee,
        networkConfig[chainId].callbackGasLimit
    )

    await marsToken.deployed()

    console.log("Your Plot On Mars NFT address is:", marsToken.address)
    console.log("Deployer's account balance is now:", (await deployer.getBalance()).toString())

    console.log(network.config)
    if (chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await marsToken.deployTransaction.wait(6) //make sure we give etherscan the time to process a tx
        await verify(marsToken.address, [])
        console.log("Your contract has been verified on etherscan")
    }
}
//return the asynchronous main function, throws error if problem
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
