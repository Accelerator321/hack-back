const mongoose = require("mongoose");
const folder = new mongoose.Schema({
  name: { type: String},
  email:{type: String, unique: true  },
  createdAt:{type:Date, default: new Date()},

});

const folders = mongoose.model("folder", folder);

module.exports = folders;
