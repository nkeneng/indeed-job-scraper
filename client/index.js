let { getJobsList, release, config } = require("../index.js");

config["max-pages"] = "20"
config["base-URL"] = "https://de.indeed.com/";
config["verbose"] = true;

import { Client } from 'node-appwrite';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {

	var data;
	//get job list data
	getJobsList({
		query: "php developer",
		location: "berlin",
		fromDays: 30,
		duplicate: 'unique',
		sc: "0bf:exrec();",
	})
		.then(jobs => data = jobs)
		.then(release);

	return res.json(data)
};