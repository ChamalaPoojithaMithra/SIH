const mongoose = require("mongoose");

const recyclingStatusSchema = new mongoose.Schema(
  {
    statusId: {
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
    transactionId: {
      type: String,
      default: "",
      trim: true
    },
    recyclerId: {
      type: String,
      required: true,
      trim: true
    },
    material: {
      type: String,
      required: true,
      trim: true
    },
    currentStatus: {
      type: String,
      enum: [
        "Received",
        "Sorting",
        "Dismantling",
        "Material Recovery",
        "Processing",
        "Recycled",
        "Completed"
      ],
      default: "Received"
    },
    percentageCompleted: {
      type: Number,
      default: 0
    },
    processingLocation: {
      type: String,
      required: true,
      trim: true
    },
    remarks: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true,
    collection: "recycling_status"
  }
);

const RecyclingStatus =
  mongoose.models.RecyclingStatus ||
  mongoose.model("RecyclingStatus", recyclingStatusSchema, "recycling_status");

module.exports = RecyclingStatus;
