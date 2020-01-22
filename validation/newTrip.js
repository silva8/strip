const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateNewTripInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.availableSeats = !isEmpty(data.availableSeats) ? data.availableSeats : "";
  // From checks
  if (Validator.isEmpty(data.from)) {
    errors.from = "Starting location is required";
  }
  // To checks
  if (Validator.isEmpty(data.to)) {
    errors.to = "Destination is required";
  }
  // Date checks
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date is required";
  }
  else if (!Validator.isISO8601(data.date)) {
    errors.date = "Departure date must be a valid date";
  }
  // Hour checks
  if (Validator.isEmpty(data.hour)) {
    errors.hour = "Hour is required";
  }
  // Minutes checks
  if (Validator.isEmpty(data.minutes)) {
    errors.minutes = "Minutes is required";
  }
  // Available seats checks
  if (Validator.isEmpty(data.availableSeats)) {
    errors.availableSeats = "Numbre of available seats is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};