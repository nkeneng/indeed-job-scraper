let { getJobInfo, release, config } = require("../index.js");

config["verbose"] = false;
config["base-URL"] = "https://de.indeed.com/";

let url = process.argv[2];

(async () => {
    try {
        var job = await getJobInfo(url);
        if (job) {
            await release()
            process.stdout.write(JSON.stringify(job))
            process.exit()
        }
        else {
            console.log("No job found");
            process.exit(1)
        }
    } catch (error) {
        console.log(error);
    }
})();