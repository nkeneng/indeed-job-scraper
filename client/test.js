const { exec } = require('child_process');

// exec(`node scripts/jobs.js "php developer" "berlin" 1`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Erreur d'exécution du script : ${error}`);
//         return res.status(500).send(`Erreur d'exécution du script : ${error}`);
//     }
//     console.log(JSON.parse(stdout));
// });


exec(`node scripts/job.js "https://de.indeed.com/viewjob?jk=92e04e90c8c37163"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur d'exécution du script : ${error}`);
        return res.status(500).send(`Erreur d'exécution du script : ${error}`);
    }
    console.log(JSON.parse(stdout));
});