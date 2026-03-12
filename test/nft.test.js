const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PolygonNFT", function () {

  let nft;
  let owner;
  let user;

  beforeEach(async function () {

    const NFT = await ethers.getContractFactory("PolygonNFT");

    [owner, user] = await ethers.getSigners();

    nft = await NFT.deploy("ipfs://example/");

    await nft.waitForDeployment();
  });

  it("Should mint successfully", async function () {

    await nft.connect(user).mint(user.address, {
      value: ethers.parseEther("1")
    });

    expect(await nft.ownerOf(1)).to.equal(user.address);
  });

  it("Should enforce max supply", async function () {

    for (let i = 0; i < 5; i++) {

      await nft.mint(owner.address, {
        value: ethers.parseEther("1")
      });
    }

    await expect(
      nft.mint(owner.address, {
        value: ethers.parseEther("1")
      })
    ).to.be.revertedWith("Max supply reached");
  });

  it("Should validate payment", async function () {

    await expect(
      nft.mint(owner.address)
    ).to.be.revertedWith("Incorrect mint price");
  });

  it("Only owner can change price", async function () {

    await expect(
      nft.connect(user).setMintPrice(2)
    ).to.be.reverted;
  });

});