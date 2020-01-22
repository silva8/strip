const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");
const carController = require("../../controllers/car");

//User routes
router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);

//Car routes
router.post("/api/cars/register", carController.register);

module.exports = router;