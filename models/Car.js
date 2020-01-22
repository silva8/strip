const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CarSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
  	type: String,
  	required: true
  },
	year: {
    type: Number,
  	required: true,
    min: 1990,
    max: 2020
  },
	plate: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  ac: {
    type: Boolean
  }
});

module.exports = Car = mongoose.model("cars", CarSchema);