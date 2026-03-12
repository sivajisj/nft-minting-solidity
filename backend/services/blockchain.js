require("dotenv").config();

const { ethers } = require("ethers");

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.POLYGON_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const abi = [
  "function mint(address to) payable returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

async function mintNFT(walletAddress) {

  const price = ethers.parseEther(process.env.MINT_PRICE);

  const tx = await contract.mint(walletAddress, {
    value: price
  });

  const receipt = await tx.wait();

  let tokenId = null;

  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog(log);

      if (parsed.name === "Transfer") {
        tokenId = parsed.args.tokenId.toString();
      }

    } catch (err) {}
  }

  return {
    txHash: receipt.hash,
    tokenId
  };
}

module.exports = {
  mintNFT
};