require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const Url = require("./models/urls.schema.js");
const { v4: uuid } = require("uuid");
const app = express();

require("./config/db.config.js");

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.post("/api/urls", (req, res) => {
	let { url } = req.body;
	let urlId = uuid().slice(0, 8);

	console.log("here", req.body);
	console.log(shortUrl);

	const newUrl = new Url({
		mainUrl: url,
		shortUrl: urlId
	});

	newUrl.save();

	res.json(req.body);
});

app.get("/:urlId", (req, res) => {
	res.json({ working: true });
});

app.get("/", (req, res) => {
	res.render("index");
});

const port = 3000;
app.listen(port, () => console.log(`app started on port: ${port}`));
