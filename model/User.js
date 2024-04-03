
const mongoose = require("mongoose")

const User_Schema = new mongoose.Schema({
    username :  { type: String, required: true }
})

const UserModel = mongoose.model("User" , User_Schema)

module.exports = UserModel