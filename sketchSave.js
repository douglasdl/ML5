let mobilenet;
let classifier;
let video;
let label = 'Teste';

let ensinar1Button;
let ensinar2Button;

let saveButton;

let trainButton;

function modelReady() {
	console.log('Model is ready!!!');
	classifier.load('model.json', customModelReady);
}

function customModelReady() {
	console.log('Custom Model is ready!!!');
}

function videoReady() {
	console.log('Video is ready!!!');
}

function whileTraining(loss) {
	if (loss == null) {
		console.log('Training Complete');
		classifier.classify(gotResults);
	} else {
		console.log(loss);
	}
}

function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		//console.log(results);
		label = result[0].label;
		classifier.classify(gotResults);
	}
}

function setup() {
	createCanvas(640, 550); 
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	ensinar1Button = createButton('Feliz');
	ensinar1Button.mousePressed(function() {
		classifier.addImage('feliz');
	});

	ensinar2Button = createButton('Triste');
	ensinar2Button.mousePressed(function() {
		classifier.addImage('triste');
	});



	trainButton = createButton('Treinar');
	trainButton.mousePressed(function() {
		classifier.train(whileTraining);
	});

	saveButton = createButton('Save');
	saveButton.mousePressed(function() {
		classifier.save();
	});

}

function draw() {
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(label, 10, height -20);
}