//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

//This contract is going to allow users to mint an NFT representing 100sqm
// of a plot of land on Mars. 
//There are only 10 unique NFTs available which price is set. First arrived,first served
//The minter won't know which plot they will get, but they will be told how many are left for sale


// import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
// import "hardhat/console.sol";



contract MarsNFT is VRFConsumerBaseV2{
//When we mint an NFT, we will trigger a Chainlink VRF Call to get a random number
//This random number will be determining which plot will be sold

//users have to pay to mint an NFT
// the owner of the marsian land can withdraw the ETH sent to this contract

//CHAINLINK VRF Variables 
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint private constant NUM_WORDS = 1;

    constructor( 
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane, 
        uint32 callbackGasLimit
        ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2); 
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;
    }

    function requestNft() public returns (uint256 requestId) {}
    // from VRFCoordinator, returns the requestID to fulfill random Words

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {}

    function tokenURI(uint256) public{}
}