//const path = require("path")

const { networkConfig } = require("../helper-hardhat-config")
const { network, ethers, run } = require("hardhat")

const chainId = network.config.chainId

const vrfCoordinatorV2 = networkConfig[chainId]["vrfCoordinatorV2"]

async function main() {
    // first, we get the address who will deploy the contract

    const [deployer] = await ethers.getSigners()
    console.log("Deploying the contracts with the account:", await deployer.getAddress())

    //then we deploy the contract
    const marsFactory = await ethers.getContractFactory("MarsNFT")
    const marsToken = await marsFactory.deploy()

    // address vrfCoordinatorV2,
    // uint64 subscriptionId,
    // bytes32 gasLane, // keyHash
    // uint256 mintFee,
    // uint32 callbackGasLimit)
    // need to add the parameters into the constructor above in the deploy()

    await marsToken.deployed()

    console.log("Our Plot On Mars NFT address is:", marsToken.address)
    console.log("Deployer's account balance:", (await deployer.getBalance()).toString())
    console.log(network.config)
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await marsToken.deployTransaction.wait(6) //make sure we give etherscan the time to process a tx
        await verify(marsToken.address, [])
    }
}

//now we want to automate contract's verification on etherscan
// only if the network is NOT hardhat
async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.nessage.toLowerCase().includes("already verified")) {
            console.log("Contract already verified, etherscan was faster than the verify()!")
        } else {
            console.log(e)
        }
    }
}
//return the asynchronous main function, throws error if problem
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
