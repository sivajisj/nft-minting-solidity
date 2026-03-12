const request = require("supertest");

const express = require("express");

const mintRoute = require("../routes/mint");

const app = express();

app.use(express.json());

app.use("/mint", mintRoute);

describe("POST /mint", () => {

  it("should return error if walletAddress missing", async () => {

    const res = await request(app)
      .post("/mint")
      .send({});

    expect(res.statusCode).toBe(400);

  });

});