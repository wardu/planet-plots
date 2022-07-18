// The Mocks are used like copies of external contracts/protocols, like Chainlink's VRF oracle
// by creating Mocks, we are creating fake versions of the original contracts, with all the functionalities, but without using the actual blockchain
// making testing faster.

// Implementing Mocks for VRF Chainlink Coordinator V2 in order to get a random number
// Mocks should be able to be used on local testnet (hardhat)
// the VRFCoordinatorV2Address will be parameterized so to not have to change our code when deploying on rinkeby later 