//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

//This contract is going to allow users to mint an NFT representing 100sqm
// of a plot of land on Mars. 
//There are only 10 unique NFTs available which price is set. First arrived,first served
//The minter won't know which plot they will get, but they will be told how many are left for sale
//When we mint an NFT, we will trigger a Chainlink VRF Call to get a random number
//This random number will be determining which plot will be sold
//users have to pay to mint an NFT
// the original owner of the land can withdraw the ETH sent to this contract

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "../node_modules/@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
// import "hardhat/console.sol";



contract MarsNFT is ERC721, Ownable {

    //Contract's variables
    uint256 private _tokenId; //the unique tokenID of the NFT deployed
    uint256 private nftFee;//price expected to be paid to mint one NFT Plot On Mars

    mapping(address => uint256) private _ownerToId; //link each NFT to their owner

    error NeedMoreEth(); //throws if the address minting the NFT does not send the correct nftFee

    event NftRequested(uint256 indexed requestId, address requester);//will emit to inform of the request
    //to get a random number, will call fulfillRandomWords from VRF
    
    constructor() ERC721("PlotOnMars", "POM"){
    }

    function withdraw() public onlyOwner {
    } //only the owner of the contract can withdraw the ETH paid for the NFTs




    // function requestNft() public returns (uint256 requestId) {}
    // // from VRFCoordinator, returns the requestID to fulfill random Words

    // function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {}

    // function tokenURI(uint256) public{}
}