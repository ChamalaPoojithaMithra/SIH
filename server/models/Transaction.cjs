const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
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
    recyclerId: {
      type: String,
      required: true,
      trim: true
    },
    lotId: {
      type: String,
      required: true,
      trim: true
    },
    material: {
      type: String,
      required: true,
      trim: true
    },
    weight: {
      type: Number,
      required: true
    },
    pricePerKg: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Completed"
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },
    transactionDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    collection: "transactions"
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema, "transactions");

module.exports = Transaction;
