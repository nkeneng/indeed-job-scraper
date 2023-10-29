let { getJobsList, getJobsPDF, release, config } = require("../index.js");

config["max-pages"] = "20"
config["base-URL"] = "https://de.indeed.com/";
config["verbose"] = true;


//get job list data
getJobsList({
	query: "php developer",
	location: "berlin",
	fromDays: 30,
	duplicate: 'unique',
	sc: "0bf:exrec();",
})
	.then(console.log)
	.then(release);