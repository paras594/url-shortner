const Validator = require("validator");
const isEmpty = require("is-empty");

const validateUrl = (data) => {
	// data = {url}
	let errors = {};

	// convert empty fields to an empty string so we can use validator functions
	data.url = !isEmpty(data.url) ? data.url : "";

	// url check
	if (Validator.isEmpty(data.url)) {
		errors.url = "URL is required";
	} else if (!Validator.isURL(data.url)) {
		console.log("invalid url");
		errors.url = "Invalid URL";
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};

module.exports = { validateUrl };
