let { getJobsList, release, config } = require("../index.js");

config["verbose"] = false;

config["base-URL"] = "https://de.indeed.com/";

let query = process.argv[2];
let location = process.argv[3];
let maxPage = process.argv[4];

config["max-pages"] = maxPage;

(async () => {
    try {
        const jobs = await getJobsList({
            query: query,
            location: location,
            fromDays: 30,
            duplicate: 'unique',
        });
        release().then(() => process.stdout.write(JSON.stringify(jobs)))
    } catch (error) {
        console.log(error);
    }
})();