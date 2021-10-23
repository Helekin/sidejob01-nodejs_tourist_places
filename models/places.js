const mongoose = require("mongoose");

const placesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      default: null,
    },
    location: {
      type: { type: String, enums: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    address: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Places = mongoose.model("places", placesSchema);

module.exports = Places;
