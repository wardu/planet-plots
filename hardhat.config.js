require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
// require("./tasks/faucet")

/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
//const COINMARKETCAP = process.env.COINMARKETCAP

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
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

// if we want to know the gas fees for the functions called, we can run `npm install hardhat-gas-reporter
// add `require("hardhat-gas-reporter")` here and add those parameters:
// gasReporter: {
//  enabled: true,
//  outputFile: "gas-report.txt"
//  noColors: true,
//  currency: "USD",
//  coinmarketcap: COINMARKETCAP
//}