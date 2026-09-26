const mongoose = require("mongoose");

const priceDemandSchema = new mongoose.Schema(
  {
    priceDemandId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    material: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: "E-Waste",
      trim: true
    },
    pricePerKg: {
      type: Number,
      required: true
    },
    demandLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    availableDemandKg: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    source: {
      type: String,
      default: "Prototype Reference Market Data (Demo)",
      trim: true
    }
  },
  {
    timestamps: true,
    collection: "price_demand"
  }
);

const PriceDemand =
  mongoose.models.PriceDemand ||
  mongoose.model("PriceDemand", priceDemandSchema, "price_demand");

module.exports = PriceDemand;
