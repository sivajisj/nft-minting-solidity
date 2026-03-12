# NFT Minting API (Polygon Amoy Testnet)

A robust, minimal NFT minting system built with Solidity, Node.js, and Docker.

This project demonstrates an end-to-end integration of an ERC-721 smart contract with a backend API, featuring secure transaction signing and containerized deployment.

---

## 🚀 Deployment Status (Amoy Testnet)

- **Contract Address:** `0xB8000099AAbE1931aBAf005D9e29C97d9b8Bc5CB`
- **Network:** Polygon Amoy Testnet (Replaces deprecated Mumbai)
- **Explorer Link:** [View on Polygonscan](https://amoy.polygonscan.com/address/0xB8000099AAbE1931aBAf005D9e29C97d9b8Bc5CB)

---

## 🛠 Tech Stack

### Smart Contract
- **Solidity:** ^0.8.20
- **OpenZeppelin:** ERC-721, Ownable, and ReentrancyGuard
- **Hardhat:** Development and testing framework

### Backend
- **Node.js & Express:** API Layer
- **ethers.js:** Blockchain interaction and wallet management

### Infrastructure
- **Docker & Docker Compose:** Containerization
- **Dotenv:** Secure environment management

---

## ✨ Features

- **ERC-721 Standard:** Full compliance with NFT standards.
- **Strict Supply Management:** Hard-coded limit of **5 NFTs**.
- **Dynamic Minting:** Backend handles transaction signing via a secure server wallet.
- **Admin Controls:** Owner can update mint price and withdraw contract funds.
- **Security:** Protected against reentrancy attacks and unauthorized access.

---

## 📂 Project Structure

```text
nft-minting-api
├── backend
│   ├── routes
│   │   └── mint.js       # Express route for /mint
│   ├── services
│   │   └── blockchain.js # Ethers.js logic
│   └── server.js         # Entry point
├── contracts
│   └── PolygonNFT.sol    # ERC-721 Smart Contract
├── scripts
│   └── deploy.js         # Deployment script
├── test
│   └── nft.test.js       # Hardhat unit tests
├── Dockerfile            # API containerization
├── docker-compose.yml    # Full stack orchestration
├── hardhat.config.js     # Amoy & Local network config
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Network Configuration
POLYGON_RPC_URL=[https://rpc-amoy.polygon.technology](https://rpc-amoy.polygon.technology)
PRIVATE_KEY=your_private_key_here

# Contract Configuration
CONTRACT_ADDRESS=0xB8000099AAbE1931aBAf005D9e29C97d9b8Bc5CB
MINT_PRICE=1

# Server Configuration
PORT=3000
```

---

## 🛠 Installation & Usage

### 1. Install Dependencies
```bash
npm install
```

### 2. Compile & Test
```bash
# Compile contracts
npx hardhat compile

# Run Hardhat unit tests
npx hardhat test
```

### 3. Deploy (Optional - Already Deployed to Amoy)
To deploy your own instance to Amoy:
```bash
npx hardhat run scripts/deploy.js --network amoy
```

---

## 🌐 API Interaction

### Start the Server
```bash
npm run dev
```

### Mint an NFT
Send a `POST` request to the `/mint` endpoint.

**Request:**
```bash
curl -X POST http://localhost:3000/mint \
-H "Content-Type: application/json" \
-d '{"walletAddress":"0xYourWalletAddress"}'
```

**Successful Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "tokenId": "1"
}
```

---

## 🐳 Docker Setup

**Build and Run with Docker Compose:**
```bash
docker compose up --build
```



## 📝 License
MIT