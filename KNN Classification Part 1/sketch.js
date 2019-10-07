let features;
let video;
let label = 'Teste';


function setup() {
	createCanvas(160, 120); 
	video = createCapture(VIDEO);
	video.size(160, 120);
	video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);
}

function mousePressed() {
	const logits = features.infer(video);
	//console.log(logits);
	console.log(logits.dataSync());
	//logits.print();

}

function modelReady() {
	console.log('Model is ready!!!');
}

function draw() {
	image(video, 0, 0);

}