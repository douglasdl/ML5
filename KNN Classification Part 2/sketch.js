// KNN Classification

let video;
let features;
let knn;
let labelP;
let ready = false;

function setup() {
	createCanvas(160, 120); 
	video = createCapture(VIDEO);
	video.size(160, 120);
	video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);
	knn = ml5.KNNClassifier();
	labelP = createP("need trining data");
	labelP.style("font-size", "32pt");
}

function goClassify() {
	const logits = features.infer(video);
	knn.classify(logits, function (error, result) {
		if (error) {
			console.log(error);
		} else {
			labelP.html(result.label);
			goClassify();
			//console.log(result);
		}
	});
}

function keyPressed() {
	const logits = features.infer(video);
	if(key == "l") {
		knn.addExample(logits, 'left');
		console.log("left");
	} else if (key == 'r') {
		knn.addExample(logits, 'right');
		console.log("right");
	} else if (key == 'u') {
		knn.addExample(logits, 'up');
		console.log("up");
	}
	//console.log(logits);
	//console.log(logits.dataSync());
	//logits.print();
}

function modelReady() {
	console.log('Model is ready!!!');
}

function draw() {
	image(video, 0, 0);
	if (!ready && knn.getNumLabels() > 0 ) {
		goClassify();
		ready = true;
	}

}

