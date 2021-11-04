const asyncHandler = require("express-async-handler");

const Place = require("../models/place");

exports.createPlace = asyncHandler(async (req, res) => {
  const {
    name,
    images,
    description,
    price,
    activities,
    latitude,
    longitude,
    address,
    phone,
    cellphone,
  } = req.body;

  const place = await Place.create({
    name,
    images,
    description,
    price,
    activities,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
    address,
    phone,
    cellphone,
  });

  if (place) {
    res.status(201).json(place);
  } else {
    res.status(400);
    throw new Error("El negocio no pudo ser creado");
  }
});

exports.updatePlace = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    activities,
    latitude,
    longitude,
    address,
    phone,
    cellphone,
  } = req.body;

  const placeExists = await Place.findById(req.params.id);

  if (placeExists) {
    placeExists.name = name;
    placeExists.description = description;
    placeExists.price = price;
    placeExists.activities = activities;
    placeExists.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
    placeExists.address = address;
    placeExists.phone = phone;
    placeExists.cellphone = cellphone;

    const place = await placeExists.save();

    res.status(201).json(place);
  } else {
    res.status(404);
    throw new Error("Lugar no encontrado");
  }
});

exports.deletePlace = asyncHandler(async (req, res) => {
  const place = Place.findById(req.params.id);

  if (place) {
    await place.deleteOne();
    res.json({ message: "Lugar eliminado" });
  } else {
    res.status(404);
    throw new Error("Lugar no encontrado");
  }
});

exports.getAllPlaces = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pagesize) || 5;

  const totalDocuments = await Place.countDocuments();

  const places = await Place.find()
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1))
    .sort({ createdAt: -1 });

  res.json({ places, pageNumber, pageSize, totalDocuments });
});

exports.getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (place) {
    res.json(place);
  } else {
    res.status(404);
    throw new Error("Lugar no encontrado");
  }
});
