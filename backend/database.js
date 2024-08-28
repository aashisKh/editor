const mongoose = require("mongoose");

const connect_to_db = () => {
    mongoose
      .connect("mongodb://localhost:27017/ChatApp")
      .then((d) => {
        console.log("connected")
      })
      .catch((err) => {
        
      });
  };
  
module.exports = {connect_to_db}