let mobilenet;
let video;
let label = '';

function modelReady() {
	console.log('Model is ready!!!');
	mobilenet.predict(gotResults);
}

// function imageReady() {
// 	image(puffin, 0, 0, width, height);	
// }

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
		mobilenet.predict(gotResults);
	}
}

function setup() {
	createCanvas(640, 550); // p5
	video = createCapture(VIDEO);	// p5
	video.hide();
	background(0);
	mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(label, 10, height -20);
}