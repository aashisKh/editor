const express = require("express");
const UserModel = require("./model/User");
const router = express.Router()

router.get("/api/users", async (req, res) => {
    const get_all_users = await UserModel.find({}, { username: 0 });
    res.json(get_all_users);
  });
  
router.post("/api/save_users", async (req, res) => {
    const user = req.body.name;
    const check_user_exists = await UserModel.find({ username: user });
    if (check_user_exists.length > 0) {
      res.json({ error: "user already exists" });
    } else {
      const saved_user = await UserModel.create({ username: user });
      res.json({
        message: "you are successfully registered",
        id: saved_user._id,
      });
    }
  });
  
router.get("/api/login", async (req, res) => {
    const user = req.query.user;
    const find_user = await UserModel.findOne({ username: user });
    if (find_user) {
      res.json({ message: "you are successfully logged in", id: find_user._id });
    } else {
      res.json({ error: "user dosenot exists" });
    }
  });

  module.exports = {router}