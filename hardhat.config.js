require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-etherscan")
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet")

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY    

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
        chainId: 1337,
        // gasPrice: 130000000000,
    },
    rinkeby: {
        url: RINKEBY_RPC_URL,
        accounts: [PRIVATE_KEY],
        chainId: 4,
        blockConfirmations: 6,
    },
},
  solidity: {
    compilers: [
        {
            version: "0.8.9",
        },
        {
          version: "0.8.0",
        },
        {
          version: "0.6.6",
        },
        {
          version: "0.6.0",
        },
    ],
  }
}