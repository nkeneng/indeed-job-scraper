const { exec } = require('child_process');
const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

app.use(basicAuth({
    users: { 'admin': 'scraper-copilot' }
}));

app.use(express.json()); // pour les données JSON
app.use(express.urlencoded({ extended: true })); // pour les données de formulaire

app.get('/check', async (req, res) => {
	res.send("alive");
});

app.post('/jobs', (req, res) => {
	let query = req.body.query;
	let location = req.body.location;
	let maxPage = req.body.maxPage;
	exec(`node scripts/jobs.js "${query}" "${location}" ${maxPage}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Erreur d'exécution du script : ${error}`);
			return res.status(500).send(`Erreur d'exécution du script : ${error}`);
		}
		res.send(JSON.parse(stdout));
	});
});


app.post('/job', async (req, res) => {
	let url = req.body.url;
	exec(`node scripts/job.js "${url}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Erreur d'exécution du script : ${error}`);
			return res.status(500).send(`Erreur d'exécution du script : ${error}`);
		}
		res.send(JSON.parse(stdout));
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});