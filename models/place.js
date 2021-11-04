const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
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
    price: {
      type: Number,
      default: null,
    },
    activities: [
      {
        type: String,
      },
    ],
    location: {
      type: { type: String, enums: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    address: {
      type: "String",
      required: true,
    },
    phone: {
      type: String,
      default: null,
    },
    cellphone: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("places", placeSchema);

module.exports = Place;
