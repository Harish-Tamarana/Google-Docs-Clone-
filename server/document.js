const mongoose = require("mongoose");

const Document = new mongoose.Schema({
  _id: { type: String },
  data: { type: Object },
});

module.exports = mongoose.model("document", Document);
