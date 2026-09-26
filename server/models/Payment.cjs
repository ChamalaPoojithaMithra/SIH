const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    transactionId: {
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
    amount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      default: "UPI",
      trim: true
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Processing", "Paid", "Failed", "Refunded"],
      default: "Pending"
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    referenceNumber: {
      type: String,
      default: "",
      trim: true
    }
  },
  {
    timestamps: true,
    collection: "payments"
  }
);

const Payment =
  mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema, "payments");

module.exports = Payment;
