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



contract MarsNFT is ERC721, Ownable, VRFConsumerBaseV2 {


    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    uint64 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane; //keyhash for the maximum gas price
    uint32 private immutable i_callbackGasLimit;// Depends on the number of requested values that you want sent to the
  // fulfillRandomWords() function. Storing each word costs about 20,000 gas. Test and adjust
  // this limit based on the network that you select, the size of the request,
  // and the processing of the callback request in the fulfillRandomWords() function.
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1; //we want to retrieve 1 random word every time 

    // VRF Helpers
    mapping(uint256 => address) public s_requestIdToSender;

   // Contract's Variables
    uint256 private i_nftFee;
    uint256 public s_tokenCounter;
    uint256 internal constant MAX_CHANCE_VALUE = 100;
    string[] internal s_plotTokenUris;
    bool private s_initialized;
    uint256 private _tokenId; 
    mapping(address => uint256) private _ownerToId; //link each NFT to their owner
    
    //throws if the address minting the NFT does not send the correct nftFee
    error NeedMoreEth(); 
    
    //will emit to inform of the request and index the id and address
    event NftRequested(uint256 indexed requestId);

    enum NFTCollection {nft1, nft2, nft3, nft4, nft5, nft16, nft17, nft18, nft19, nft10 }


    constructor(
        address vrfCoordinatorV2,
        uint64 subscriptionId,
        bytes32 gasLane, // keyHash
        uint256 mintFee,
        uint32 callbackGasLimit) 
        VRFConsumerBaseV2(vrfCoordinatorV2)
        ERC721("PlotOnMars", "POM"){
            i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
            i_gasLane = gasLane;
            i_subscriptionId = subscriptionId;
            i_nftFee = mintFee;
            i_callbackGasLimit = callbackGasLimit;
    }


    // function mintNft() external {} 

    function requestNft() external {
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane,
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );
        emit NftRequested(requestId);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        // will use the random words (aka random number) to pick from an array of NFTs pre-determined
        //enum size plots/NFT = 10
        // randomNumber % 10 will give us a number between 0 and 9
        // which will be used to select the index of the NFT within the enum
    }

    function setMintFee(uint256 newMintFee) private onlyOwner returns(uint256){
        //requires additional security
        return i_nftFee = newMintFee;
    } // the owner of the contract has the freedom to modify the mintFee 

    function withdraw() private onlyOwner {
    } //only the owner of the contract can withdraw the ETH paid for the NFTs


    function getMintFee() public view returns (uint256) {
        return i_nftFee;
    }
 
}