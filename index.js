const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Global config access
dotenv.config();

const app = express();

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}...`);
});

//Generating JWT
app.post("/user/generatetoken", (req, res) => {
  // Validate user
  // then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    userId: 12,
  };

  const token = jwt.sign(data, jwtSecretKey);
  res.send(token);
});

// Verification of JWT
app.get("/user/validatetoken", (req, res) => {
  // Tokens are generally passed in header of request due to security reasons

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      //Access denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});
