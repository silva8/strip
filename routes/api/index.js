const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");
const carController = require("../../controllers/car");
const tripController = require("../../controllers/trip");

//User routes
router.post("/api/users/register", userController.register);
router.post("/api/users/login", userController.login);

//Car routes
router.post("/api/cars/register", carController.register);

//Trip routes
router.post("/api/trip/create", tripController.addNewTrip);

module.exports = router;