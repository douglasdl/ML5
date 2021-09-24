let img;
let detector;
let modelName = 'cocossd';
//let modelName = 'yolo';


function modelLoaded() {
	console.log('Model Loaded!');
}
  

function preload() {
	img = loadImage('image.jpg');
	detector = ml5.objectDetector(modelName);
}

function gotDetections(error, results) {
	if(error) {
		console.log(error)
	}
	//console.log(results);
	for(let i = 0; i < results.length; i++) {
		let object = results[i];
		// Draw the rectangle
		stroke(0, 255, 0);
		strokeWeight(4);
		noFill();
		rect(object.x, object.y, object.width, object.height)

		// Add a label
		noStroke();
		fill(0);
		textSize(24);
		text(object.label, object.x + 10, object.y + 24);

		fill(255);
		textSize(23);
		text(object.label, object.x + 9, object.y + 23);
	}
}

function setup() {
	createCanvas(640, 480);
	//console.log(detector);
	image(img, 0, 0);
	detector.detect(img, gotDetections);
}

