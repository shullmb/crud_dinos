const express = require('express');
const app = express();
const layouts = require('express-ejs-layouts');
const fs = require('fs');
const port = 3000;

app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({extended: false}));


app.get('/', function(req, res) {
	res.render('index')
})

// GET /dinosaurs - index route - gets ALLL dinos
app.get('/dinosaurs', function(req, res) {
	let dinosaurs = fs.readFileSync("./dinosaurs.json");
	let dinoData = JSON.parse(dinosaurs);
	res.render('dinos/index', {dinosaurs: dinoData});
})

// GET /dinosaurs/new - serve up our NEW dino form
app.get('/dinosaurs/new', function(req, res) {
	res.render('dinos/new');
})

// GET /dinosaurs/:id - show route - gets ONE dino
app.get('/dinosaurs/:id', function(req,res) {
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	let dinoData = JSON.parse(dinosaurs);

	let id = parseInt(req.params.id)
	res.render('dinos/show', {dinosaur: dinoData[id]})
})

// POST /dinosaurs
app.post('/dinosaurs', function(req, res) {
	// read in our JSON file
	let dinosaurs = fs.readFileSync('./dinosaurs.json');
	// convert it to an array
	let dinoData = JSON.parse(dinosaurs);
	// push our new data into the array
	let newDino = {
		type: req.body.dinosaurType,
		name: req.body.dinosaurName
	}
	dinoData.push(newDino);
	// write the array back to the file
	fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData));

	res.redirect('/dinosaurs');
})




app.listen(port, function() {
	console.log('📣 We are listening on port: ' + port);
})
