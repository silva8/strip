const mongoose = require("mongoose");
//Load input validation
const validateCarRegisterInput = require("../validation/carRegister");
//Load car model
const Car = require("../models/Car");


const carController = {
	// @Register car controller
	// @desc Register car
	register: (req, res) => {
		//Form validation
		const { errors, isValid } = validateCarRegisterInput(req.body);
		//Check validation
		if(!isValid) {
			return res.status(400).json(errors);
		}
		//New car object
		const newCar = new Car({
			userId: mongoose.Types.ObjectId(req.body.userId),
			brand: req.body.brand,
			model: req.body.model,
			year: req.body.year,
			plate: req.body.plate,
			color: req.body.color,
			seats: req.body.seats,
			ac: req.body.ac
		});
		//Save car on DB
		newCar
	    .save()
	    .then(car => res.json(car))
	    .catch(err => console.log(err));
	}
}

module.exports = carController;