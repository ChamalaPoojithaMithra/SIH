const mongoose = require("mongoose");

const eWasteLotSchema = new mongoose.Schema(
  {
    lotId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    collectorId: {
      type: String,
      required: true,
      trim: true
    },
    material: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: "Electronics",
      trim: true
    },
    description: {
      type: String,
      default: "",
      trim: true
    },
    weight: {
      type: Number,
      required: true
    },
    estimatedValue: {
      type: Number,
      default: 0
    },
    imageUrl: {
      type: String,
      default: ""
    },
    identificationMethod: {
      type: String,
      default: "Manual"
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["Available", "Offer Received", "Accepted", "Sold", "Cancelled"],
      default: "Available"
    }
  },
  {
    timestamps: true,
    collection: "e_waste_lots"
  }
);

const EWasteLot =
  mongoose.models.EWasteLot ||
  mongoose.model("EWasteLot", eWasteLotSchema, "e_waste_lots");

module.exports = EWasteLot;
