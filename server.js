require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const Url = require("./models/urls.schema.js");
const { v4: uuid } = require("uuid");
const { validateUrl } = require("./validators.js");
const app = express();

require("./config/db.config.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

function generateId() {
	return uuid().slice(0, 8);
}

async function checkId(id) {
	let myId = id;
	let url = await Url.findOne({ shortUrl: myId });
	if (url) {
		myId = generateId();
		return checkId(myId);
	} else {
		return myId;
	}
}

app.post("/api/urls", async (req, res) => {
	let { url } = req.body;
	let { isValid, errors } = validateUrl(req.body);

	if (!isValid) {
		console.log(errors);
		return res.status(400).json({
			message: "Validation errors",
			errors
		});
	}

	let urlId = generateId();

	urlId = await checkId(urlId);

	let newUrl = new Url({
		mainUrl: url,
		shortUrl: urlId
	});

	newUrl.save().then(() => {
		res.status(201).json({
			url: `http://localhost:3000/${urlId}`
		});
	});
});

app.get("/favicon.ico", (req, res) => {
	return;
});

app.get("/:urlId", (req, res) => {
	const { urlId } = req.params;

	Url.findOne({ shortUrl: urlId }).then((url) => {
		const { mainUrl } = url;
		res.redirect(mainUrl);
	});
});

app.get("/", (req, res) => {
	res.render("index");
});

const port = 3000;
app.listen(port, () => console.log(`app started on port: ${port}`));
