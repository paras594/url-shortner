const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlsSchema = new Schema({
	mainUrl: {
		type: String,
		required: true
	},
	shortUrl: {
		type: String,
		required: true,
		unique: true,
		index: true
	}
});

const Url = mongoose.model("Url", UrlsSchema);
module.exports = Url;
