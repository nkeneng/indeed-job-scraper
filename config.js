let URL = require("url").URL;

//-----------------------------------------------------------------------------

const defaults = {
	"scrape": {
		"job-cards": "#mosaic-provider-jobcards > ul > li div.result",
		"job-title": "span[title]",
		"job-link": "h2.jobTitle > a.jcs-JobTitle",
		"company-name": 'span[data-testid="company-name"]',
		"company-location": 'div[data-testid="text-location"]',
		"company-rating": 'span[data-testid="holistic-rating"] > span',
		"job-snippet": "div.job-snippet",
		"post-date": "span.date",
		"job-salary": ["div.salary-snippet-container", "div.estimated-salary-container"]
	},
	"base-URL": "https://de.indeed.com",
	"max-pages": 5,
	"verbose": true
}

//-----------------------------------------------------------------------------

let config = {
	get ["job-cards"]() {
		return defaults["scrape"]["job-cards"]
	},
	get ["job-link"]() {
		return defaults["scrape"]["job-link"]
	},
	get ["job-title"]() {
		return defaults["scrape"]["job-title"]
	},
	get ["company-name"]() {
		return defaults["scrape"]["company-name"]
	},
	get ["company-location"]() {
		return defaults["scrape"]["company-location"]
	},
	get ["company-rating"]() {
		return defaults["scrape"]["company-rating"]
	},
	get ["job-snippet"]() {
		return defaults["scrape"]["job-snippet"]
	},
	get ["post-date"]() {
		return defaults["scrape"]["post-date"]
	},
	get ["job-salary"]() {
		return defaults["scrape"]["job-salary"]
	},
	get ["base-URL"]() {
		return defaults["base-URL"]
	},
	get ["max-pages"]() {
		return defaults["max-pages"]
	},
	get ["verbose"]() {
		return defaults["verbose"]
	},
	set ["base-URL"](baseURL) {
		defaults["base-URL"] = (new URL(baseURL)).href;
	},
	set ["max-pages"](maxPages) {
		let n = Number.parseInt(maxPages + "");
		if (!isNaN(n) && isFinite(n) && n >= 0) return defaults["max-pages"] = n;
		throw new Error("maxPages should be a positive number or convertable to a positive number");
	},
	set ["verbose"](verbose) {
		defaults["verbose"] = !!verbose;
	},
}

//-----------------------------------------------------------------------------

module.exports = config;