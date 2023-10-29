let { getJobsList, getJobInfo, release, config } = require("../index.js");

const express = require('express');

const app = express();

config["max-pages"] = "1"
config["base-URL"] = "https://de.indeed.com/";
config["verbose"] = true;


app.get('/', (req, res) => {

	//get job list data
	var jobs =  getJobsList({
		query: "php developer",
		location: "berlin",
		fromDays: 30,
		duplicate: 'unique',
		sc: "0bf:exrec();",
	})
.then((jobs) => {
	//get job info data
	console.log(jobs[0]["job-link"])
	getJobInfo(jobs[0]["job-link"]).then((job) => res.send(job));
})

});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});