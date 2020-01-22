const mongoose = require("mongoose");
const moment = require("moment");
//Load input validation
const validateNewTripInput = require("../validation/newTrip");
//Load car model
const Trip = require("../models/Trip");


const tripController = {
	// @New trip controller
	// @desc Add new trip
	addNewTrip: (req, res) => {
		//Form validation
		const { errors, isValid } = validateNewTripInput(req.body);
		//Check validation
		if(!isValid) {
			return res.status(400).json(errors);
		}
		const date = moment(req.body.date + " " + req.body.hour + ":" + req.body.minutes);
		//New car object
		const newTrip = new Trip({
			carId: mongoose.Types.ObjectId(req.body.carId),
			from: req.body.from,
			to: req.body.to,
			date: date,
			availableSeats: req.body.availableSeats
		});
		//Save car on DB
		newTrip
	    .save()
	    .then(trip => res.json(trip))
	    .catch(err => console.log(err));
	}
}

module.exports = tripController;