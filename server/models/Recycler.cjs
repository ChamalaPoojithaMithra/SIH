const mongoose = require("mongoose");

const recyclerSchema = new mongoose.Schema(
  {
    recyclerId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    companyName: {
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
    collection: "recyclers"
  }
);

const Recycler =
  mongoose.models.Recycler ||
  mongoose.model("Recycler", recyclerSchema, "recyclers");

module.exports = Recycler;