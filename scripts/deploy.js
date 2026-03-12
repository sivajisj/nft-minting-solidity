const hre = require("hardhat");

async function main() {

  const baseURI = "ipfs://example/";

  const NFT = await hre.ethers.getContractFactory("PolygonNFT");

  const nft = await NFT.deploy(baseURI);

  await nft.waitForDeployment();

  const address = await nft.getAddress();

  console.log("NFT deployed to:", address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});