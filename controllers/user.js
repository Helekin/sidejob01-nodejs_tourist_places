const asyncHandler = require("express-async-handler");

const generateToken = require("../utils/generateToken");

const User = require("../models/user");

exports.userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("El usuario ya existe");
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  const user = await User.findById(newUser._id).select("-password");

  if (user) {
    res.status(201).json(user);
  }
});

exports.userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id, user.isAdmin),
    });
  } else {
    res.status(401);
    throw new Error("Correo o contraseña inválidos");
  }
});

exports.getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("Usuario no encontrado");
  }
});

exports.updateUserImage = asyncHandler(async (req, res) => {
  const { image } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { image: image } },
    { new: true, upsert: true }
  ).select("-password");

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("La imagen del usuario no se pudo actualizar");
  }
});
