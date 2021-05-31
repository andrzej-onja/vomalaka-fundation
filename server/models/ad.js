var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AdSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: "users",
  // },
});

var AdModel = mongoose.model("ad", AdSchema);
module.exports = AdModel;
