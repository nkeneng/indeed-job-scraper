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
	"job-scrape" : {
		
		"job-title"             : "h1.jobsearch-JobInfoHeader-title > span",
		"company-name"          : 'div[data-testid="inlineHeader-companyName"] > span > a',
		"company-location"      : 'div[data-testid="inlineHeader-companyLocation"] > div',
		"company-apply-link"    : "#indeedApplyButton",
		"job-type"              : "#salaryInfoAndJobType > span",
		"job-description"       : "div#jobDescriptionText",

		"job-qualifications"    : "ul.jobsearch-ReqAndQualSection-item--closedBullets > li.jobsearch-ReqAndQualSection-item",
		"job-activity"          : "h3.jobsearch-HiringInsights-subheader:contains('Job activity') + p > span:nth-child(2)",
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

let jobConfig = {
	get ["job-title"]() {
		return defaults["job-scrape"]["job-title"]
	},
	get ["company-name"]() {
		return defaults["job-scrape"]["company-name"]
	},
	get ["company-location"]() {
		return defaults["job-scrape"]["company-location"]
	},
	get ["company-rating"]() {
		return defaults["job-scrape"]["company-rating"]
	},
	get ["company-apply-link"]() {
		return defaults["job-scrape"]["company-apply-link"]
	},
	get ["job-salary"]() {
		return defaults["job-scrape"]["job-salary"]
	},
	get ["job-type"]() {
		return defaults["job-scrape"]["job-type"]
	},
	get ["job-qualifications"]() {
		return defaults["job-scrape"]["job-qualifications"]
	},
	get ["job-description"]() {
		return defaults["job-scrape"]["job-description"]
	},
	get ["job-activity"]() {
		return defaults["job-scrape"]["job-activity"]
	},
	get ["base-URL"]() {
		return defaults["base-URL"]
	},
	set ["base-URL"](baseURL) {
		defaults["base-URL"] = (new URL(baseURL)).href;
	},
}

//-----------------------------------------------------------------------------

module.exports = config;

module.exports.jobConfig = jobConfig;