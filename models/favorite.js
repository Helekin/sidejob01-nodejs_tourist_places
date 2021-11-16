const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "places",
    },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("favorites", favoriteSchema);

module.exports = Favorite;
