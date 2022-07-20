// to verify the contracts on etherscan automatically when on Rinkeby
// we can't have these functions in our `helper-hardhat-config`
// since these use the hardhat library
// and it would be a circular dependency
const { run, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

export async function verify(contractAddress, args) {
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
