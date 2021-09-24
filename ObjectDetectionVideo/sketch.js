let video;
let detector;
let detections = [];
let modelName = 'cocossd';
//let modelName = 'yolo';



function modelLoaded() {
	console.log('Model Loaded!');
}


function modelReady() {
	detector.detect(video, gotDetections);
}
  

function videoReady() {
	detector = ml5.objectDetector(modelName, modelReady);
}


function gotDetections(error, results) {
	if(error) {
		console.error(error);
	}
	
	detections = results;
	detector.detect(video, gotDetections);
}


function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO, videoReady);
	video.size(640, 480);
	video.hide();
}


function draw() {
	image(video, 0, 0);

	for(let i = 0; i < detections.length; i++) {
		let object = detections[i];
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