const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");

const { errorHandler, notFoundHandler } = require("./middleware/error");

const userRoutes = require("./routes/user");
const placeRoutes = require("./routes/place");
const reviewRoutes = require("./routes/review");
const favoriteRoutes = require("./routes/favorite");

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.options("*", cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
