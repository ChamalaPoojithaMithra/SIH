const mongoose = require("mongoose");

const collectorSchema = new mongoose.Schema(
  {
    collectorId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    verificationStatus: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true,
    collection: "collectors"
  }
);

const Collector =
  mongoose.models.Collector ||
  mongoose.model("Collector", collectorSchema, "collectors");

module.exports = Collector;