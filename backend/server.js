require("dotenv").config();

const express = require("express");
const cors = require("cors");

const mintRoute = require("./routes/mint");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mint", mintRoute);

app.get("/", (req, res) => {
  res.send("NFT Mint API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});