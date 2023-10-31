let { getJobInfo, release, config } = require("../index.js");

config["verbose"] = false;
config["base-URL"] = "https://de.indeed.com/";

let url = process.argv[2];

(async () => {
    try {
        var job = await getJobInfo(url);    
        release().then(() => process.stdout.write(JSON.stringify(job)))
    } catch (error) {
        console.log(error);
    }
})();