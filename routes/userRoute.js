const router = require("express").Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "50m" });
  return token;
};

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      throw new Error("Kindly provide a username");
    }
    if (!password) {
      throw new Error("Kindly provide a password");
    }
    if (!validator.isByteLength(username, { min: 2 })) {
      throw Error("Username should be at least 7 Characters long");
    }

    const userExists = await userModel.findOne({ username });

    if (userExists) {
      throw new Error("Username exists, please try another");
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    console.log(hashed);
    const user = await new userModel({ username, password: hashed });
    await user.save();

    const token = await createToken(user._id);

    res.status(200).send({
      message: "User registered successfully",
      username: user.username,
      token,
    });
  } catch (e) {
    await res.status(401).json({ error: e.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username) {
      throw new Error("Kindly provide a username");
    }
    if (!password) {
      throw new Error("Kindly provide a password");
    }
    const user = await userModel.findOne({ username });
    if (!user) {
      throw new Error("Username does not exists, please try again");
    }

    const compare = await bcrypt.compare(password, user.password);
    // console.log(compare);
    if (!compare) {
      throw new Error("Password incorrect, please try again");
    }

    const token = await createToken(user._id);
    res.status(200).send({
      message: "Successfully logged in",
      username: user.username,
      token,
    });
  } catch (e) {
    await res.status(401).json({ error: e.message });
  }
});

module.exports = router;
