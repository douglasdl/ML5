let mobilenet;
let video;
let label = '';
let classifier;
let oculosButton;
let iphoneButton;
let trainButton;

function modelReady() {
	console.log('Model is ready!!!');
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

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		//console.log(results);
		label = results[0].label;
		//let prob = results[0].confidence;
	
		//createP(label);
		//createP(prob);
		//createDiv('Label: ' + results[0].label);
		//createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
		classifier.classify(gotResults);
	}
}

function setup() {
	createCanvas(640, 550); // p5
	video = createCapture(VIDEO);	// p5
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	oculosButton = createButton('oculos');
	oculosButton.mousePressed(function() {
		classifier.addImage('oculos');
	});

	iphoneButton = createButton('iPhone');
	iphoneButton.mousePressed(function() {
		classifier.addImage('iPhone');
	});

	trainButton = createButton('train');
	trainButton.mousePressed(function() {
		classifier.train(whileTraining);
	});
}

function draw() {
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(label, 10, height -20);
}