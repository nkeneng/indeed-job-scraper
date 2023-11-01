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
        if (jobs) {
            await release()
            process.stdout.write(JSON.stringify(jobs))
            process.exit()
        } else {
            console.log("No jobs found");
            process.exit(1)
        }
    } catch (error) {
        console.log(error);
    }
})();