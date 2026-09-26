const mongoose = require("mongoose");

const pickupRouteSchema = new mongoose.Schema(
  {
    routeId: {
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
    pickupLocation: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    pickupDate: {
      type: Date,
      default: Date.now
    },
    distanceKm: {
      type: Number,
      default: 0
    },
    estimatedTimeMinutes: {
      type: Number,
      default: 0
    },
    routeStatus: {
      type: String,
      enum: ["Pending", "Assigned", "In Transit", "Completed", "Cancelled"],
      default: "Pending"
    }
  },
  {
    timestamps: true,
    collection: "pickup_routes"
  }
);

const PickupRoute =
  mongoose.models.PickupRoute ||
  mongoose.model("PickupRoute", pickupRouteSchema, "pickup_routes");

module.exports = PickupRoute;
