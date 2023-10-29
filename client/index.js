let { getJobsList, getJobsPDF, release, config } = require("../index.js");

const express = require('express');

const app = express();

config["max-pages"] = "20"
config["base-URL"] = "https://de.indeed.com/";
config["verbose"] = true;


app.get('/', (req, res) => {
	//get job list data
	getJobsList({
		query: "php developer",
		location: "berlin",
		fromDays: 30,
		duplicate: 'unique',
		sc: "0bf:exrec();",
	})
		.then(jobs => res.send(jobs))
		.then(release);

});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});