const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const { protection } = require("../middleware/auth");

router.post("/", userController.userRegister);

router.post("/login", userController.userLogin);

module.exports = router;
