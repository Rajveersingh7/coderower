const mongoose = require("mongoose");

const configurationSchema = new mongoose.Schema(
  {
    configurationId: {
      type: String,
      required: true,
      unique: true
    },
    grid: {
      type: [[String]],
      required: true,
      default: [
        ["sym1", "sym2", "sym3"],
        ["sym4", "sym6", "sym8"],
        ["sym5", "sym1", "sym0"]
      ]
    },
    remark: {
      type: String,
      default: ""
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model("Configuration", configurationSchema);
