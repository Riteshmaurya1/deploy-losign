const UserModel = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function for SignUp
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists in DB
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists,You can login",
        success: false,
      });
    }
    // check for new user
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({ message: "SignUp successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error...", success: false });
  }
};



// Function for Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists in DB
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth fails email Or password is wrong";
    if (!user) {
      return res.status(403)
      .json({
        message: errorMsg,
        success: false,
      });
    }


    // check password and after decrypting password we macthes to DB
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403)
      .json({
        message: errorMsg,
        success: false,
      });
    }

    // if password is true then we will generate JWT token and send it to user
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201)
    .json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error...",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login
};
