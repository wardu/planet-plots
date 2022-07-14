const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
// `describe` receives the name of a section of our test suite, and a callback. 
//The callback must define the tests of that section. This callback can't be an async function.
describe("Plot On Mars contract", function () {

    // We define a deploy fixture to reuse the same setup in every test.
    async function deployTokenFixture() {
      const token = await ethers.getContractFactory("MarsNFT");
      const [owner, addr1, addr2] = await ethers.getSigners();
      const marsToken = await token.deploy();
  
      await marsToken.deployed();
  
      return { token, marsToken, owner, addr1, addr2 };
    }


    describe("Deployment", function () {
        let _name='PlotOnMars';
        let _symbol='POM';
        it("Should set the right owner", async function () {
          // We use loadFixture to setup our environment, get the deployer's address
          // and get the 
          const { marsToken, owner } = await loadFixture(deployTokenFixture);
          expect(await marsToken.owner()).to.equal(owner.address);
        }); // passed correctly 14.07.22 - 13h52

        it("Should have the correct name and symbol", async function (){
          const { marsToken } = await loadFixture(deployTokenFixture);
          expect(await marsToken.name()).to.equal(_name);
          expect(await marsToken.symbol()).to.equal(_symbol);
        });// passed correctly 14.07.22 - 14h09
    }) 
})