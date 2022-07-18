const {run} = require("hardhat")

const verify = async (contractAddress, args) => {
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

modeule.exports = {verify}

// this document allows us to automatically verify our contract on Etherscan when not running on the hardhat network