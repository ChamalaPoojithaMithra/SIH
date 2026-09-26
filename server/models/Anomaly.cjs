const mongoose = require("mongoose");

const anomalySchema = new mongoose.Schema(
  {
    anomalyId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    transactionId: {
      type: String,
      default: "",
      trim: true
    },
    collectorId: {
      type: String,
      default: "",
      trim: true
    },
    recyclerId: {
      type: String,
      default: "",
      trim: true
    },
    anomalyType: {
      type: String,
      enum: [
        "Duplicate Transaction",
        "Unusual Weight",
        "Price Mismatch",
        "Repeated Transaction",
        "Suspicious Activity",
        "Invalid Data"
      ],
      default: "Suspicious Activity"
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    },
    detectedBy: {
      type: String,
      enum: ["System", "Admin", "Gemini AI"],
      default: "System"
    },
    status: {
      type: String,
      enum: ["Open", "Under Review", "Resolved", "Dismissed"],
      default: "Open"
    },
    resolvedAt: {
      type: Date,
      default: null
    },
    remarks: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true,
    collection: "anomalies"
  }
);

const Anomaly =
  mongoose.models.Anomaly ||
  mongoose.model("Anomaly", anomalySchema, "anomalies");

module.exports = Anomaly;
