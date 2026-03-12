// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PolygonNFT is ERC721, Ownable, ReentrancyGuard {

    uint256 public constant MAX_SUPPLY = 5;
    uint256 public mintPrice = 1 ether;

    uint256 private tokenCounter;

    string private baseTokenURI;

   constructor(string memory baseURI)
    ERC721("PolygonNFT", "PNFT")
{
    baseTokenURI = baseURI;
}

    function mint(address to) public payable nonReentrant returns (uint256) {

        require(tokenCounter < MAX_SUPPLY, "Max supply reached");
        require(msg.value == mintPrice, "Incorrect mint price");

        tokenCounter++;

        uint256 newTokenId = tokenCounter;

        _safeMint(to, newTokenId);

        return newTokenId;
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

  function withdraw() external onlyOwner nonReentrant {

    uint256 balance = address(this).balance;

    require(balance > 0, "No funds");

    (bool success, ) = payable(owner()).call{value: balance}("");

    require(success, "Transfer failed");
}

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }
}