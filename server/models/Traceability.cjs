const mongoose = require("mongoose");

const traceabilitySchema = new mongoose.Schema(
  {
    traceabilityId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    lotId: {
      type: String,
      required: true,
      trim: true
    },
    collectorId: {
      type: String,
      required: true,
      trim: true
    },
    recyclerId: {
      type: String,
      required: true,
      trim: true
    },
    transactionId: {
      type: String,
      default: "",
      trim: true
    },
    currentStage: {
      type: String,
      enum: [
        "Collected",
        "Sorted",
        "Transported",
        "Received by Recycler",
        "Processing",
        "Recycled",
        "Completed"
      ],
      default: "Collected"
    },
    previousStage: {
      type: String,
      default: "",
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    remarks: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: "traceability"
  }
);

const Traceability =
  mongoose.models.Traceability ||
  mongoose.model("Traceability", traceabilitySchema, "traceability");

module.exports = Traceability;
