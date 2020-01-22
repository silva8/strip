const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCarRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.brand = !isEmpty(data.brand) ? data.brand : "";
  data.model = !isEmpty(data.model) ? data.model : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.plate = !isEmpty(data.plate) ? data.plate : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.seats = !isEmpty(data.seats) ? data.seats : "";
  data.ac = !isEmpty(data.ac) ? data.ac : "";
// User checks
  if (Validator.isEmpty(data.userId)) {
    errors.userId = "You must be logged in to register a car";
  }
// Brand checks
  if (Validator.isEmpty(data.brand)) {
    errors.brand = "Brand field is required";
  }
// Model checks
  if (Validator.isEmpty(data.model)) {
    errors.model = "Model field is required";
  }
// Year checks
  if (Validator.isEmpty(data.year)) {
    errors.year = "Year field is required";
  }
// Plate checks
  if (Validator.isEmpty(data.plate)) {
    errors.plate = "Plate field is required";
  }
// Color checks
  if (Validator.isEmpty(data.color)) {
    errors.color = "Color field is required";
  }
// Seats checks
  if (Validator.isEmpty(data.seats)) {
    errors.seats = "Number of seats is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};