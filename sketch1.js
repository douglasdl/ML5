let mobilenet;

let puffin;

function modelReady() {
	console.log('Model is ready!!!');
	//window.alert('Model is ready!!!');
	mobilenet.predict(puffin, gotResults);
}

function imageReady() {
	image(puffin, 0, 0, width, height);	
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		let label = results[0].label;
		let prob = results[0].confidence;
		fill(0);
		textSize(64);
		text(label, 10, height -100);
		createP(label);
		createP(prob);
		createDiv('Label: ' + results[0].label);
		createDiv('Confidence: ' + nf(results[0].confidence, 0, 2));
	}
}

function setup() {
	createCanvas(640, 480); // p5
	puffin = createImg('puffin.jpg', imageReady);	// p5
	puffin.hide();
	background(0);
	mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}