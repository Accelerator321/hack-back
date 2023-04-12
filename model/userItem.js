const mongoose = require("mongoose");
const items = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String}, 
  user: { type: String}, 
   
  createdAt:{type:Date, default: new Date()},
  folderName:{ type: String, required: true },
  url: { type: String},
  file: { type: String },

});

const userItem = mongoose.model("userItem", items);

module.exports = userItem;
