const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter.js");
const ProductRouter = require("./Routes/ProductRouter.js");

require("dotenv").config();

// require database.
require("./Config/db.js");

const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use('/products',ProductRouter)

// Basic route
app.get("/", (req, res) => {
  res.send("HomePage");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
