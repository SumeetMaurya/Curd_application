const mongoose = require('mongoose')


const document = new mongoose.Schema({
    filename: String,
    filepath: String,
    filetype: String,
    userid: String
  });
  const documentdetail = mongoose.model("documentdetail", document);

  module.exports = documentdetail