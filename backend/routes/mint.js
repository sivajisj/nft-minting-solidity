const express = require("express");
const router = express.Router();

const { mintNFT } = require("../services/blockchain");

router.post("/", async (req, res) => {

  try {

    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({
        error: "walletAddress is required"
      });
    }

    const result = await mintNFT(walletAddress);

    res.json({
      success: true,
      txHash: result.txHash,
      tokenId: result.tokenId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

module.exports = router;