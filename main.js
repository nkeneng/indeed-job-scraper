let { Parser } 		 = require("./lib/parser");
let { PdfGenerator } = require("./lib/pdfGenerator");

//---------------------------------------------------------------------------------------

const PARAMS = {
	query 		: "python",
	location 	: "",
	sort 		: "",
	siteType 	: "",
	jobType 	: "",
	fromDays 	: 7,
	duplicate   : 1,
	maxPerPage  : 25,
	pageLimit   : 10
}
Object.seal(PARAMS);

//---------------------------------------------------------------------------------------

function getJobs() {
	let parser = new Parser(PARAMS);
	return parser.getJobs();
}

//---------------------------------------------------------------------------------------

function getPdf(path) {
	return getJobs().then((jobs) => {
		return new PdfGenerator(jobs , path).generatePDF();
	});
}

//---------------------------------------------------------------------------------------


exports.PARAMS  = PARAMS;
exports.getJobs = getJobs;
exports.getPdf  = getPdf;