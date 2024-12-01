const express = require("express");
const ensureAuthenticated = require("../MIddleware/Auth");
const router = express.Router();

//login backend route
router.get("/", ensureAuthenticated, (req, res) => {
    console.log("------logged in user details-----",req.user);
    
  res.status(200).json([
    {
      name: "moblie",
      price: 10000,
    },
    {
      name: "tv",
      price: 20000,
    },
  ]);
});

module.exports = router;
