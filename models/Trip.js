const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    car: {
      type: Schema.Types.ObjectId,
      required: true
    },
    from: {
    	type: String,
    	required: true
  	},
  	to: {
  		type: String,
  		required: true
  	},
  	date: {
    	type: Date,
    	required: true
  	},
  	availableSeats: {
    	type: Number,
      required: true
  	},
    passengers: [Schema.Types.ObjectId]
});

module.exports = User = mongoose.model("users", UserSchema);