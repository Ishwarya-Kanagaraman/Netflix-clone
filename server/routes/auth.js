const router = require("express").Router();

const User = require("../models/User.js");
const CryptoJs = require("crypto-js");
const { SECRET_KEY } = require("../config/dev.js");
const jwt=require("jsonwebtoken");

// REGISTER

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password: CryptoJs.AES.encrypt(password, SECRET_KEY).toString(),
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .send("No user found kindly register and try again");

    const bytes = CryptoJs.AES.decrypt(user.password, SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return res.status(404).send("Invalid credentials");
    }
    const accessToken=jwt.sign({id:user._id,isAdmin:user.isAdmin},SECRET_KEY)
    // localStorage.setItem("jwt",accessToken);

    const { password, ...info } = user._doc;
    res.status(200).json({...info,accessToken});
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
