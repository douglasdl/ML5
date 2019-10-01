let features;
let classifier;
let video;
let label = 'Loading model...';

function setup() {
	createCanvas(320, 240); 
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);
}

function mousePressed() {
	const logits = features.infer(video);
	//console.log(logits);
	//logits.print();
	console.log(logits.dataSync());
} 


function modelReady() {
	console.log("Model Ready");
}
function draw() {
	background(0);
	image(video, 0, 0);
	fill(255);
	textSize(32);
	text(label, 10, height -20);
}