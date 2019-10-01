let mobilenet;
let predictor; // regressor
let video;
let value = 0;

let slider;
let addButton;
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
		predictor.predict(gotResults);
	} else {
		console.log(loss);
	}
}

function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		//console.log(results);
		value = result.value;
		predictor.predict(gotResults);
	}
}

function setup() {
	createCanvas(640, 550); 
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	predictor = mobilenet.regression(video, videoReady);

	
	slider = createSlider(0, 1, 0.5, 0.01);
	// slider.input(function() {
	// 	//console.log(slider.value());
	// 	predictor.addImage(slider.value());
	// });

	addButton = createButton('Add exemple image');
	addButton.mousePressed(function() {
		predictor.addImage(slider.value());
	});

	trainButton = createButton('Treinar');
	trainButton.mousePressed(function() {
		predictor.train(whileTraining);
	});
}

function draw() {
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(value, 10, height -20);
}