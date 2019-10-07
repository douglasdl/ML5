// KNN Classification

let x, y;

let video;
let features;
let knn;
let labelP;
let ready = false;
let label = "";

function setup() {
	createCanvas(320, 240); 
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.style("transform", "scale(-1,1)");
	//video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);

	labelP = createP("need trining data");
	labelP.style("font-size", "32pt");

	x = width / 2;
	y = height / 2;
}

function goClassify() {
	const logits = features.infer(video);
	knn.classify(logits, function (error, result) {
		if (error) {
			console.log(error);
		} else {
			label = result.label;
			labelP.html(label);
			goClassify();
			//console.log(result);
		}
	});
}

function keyPressed() {
	const logits = features.infer(video);
	if(key == "l") {
		knn.addExample(logits, '左');
		console.log("left");
	} else if (key == 'r') {
		knn.addExample(logits, '右');
		console.log("right");
	} else if (key == 'u') {
		knn.addExample(logits, '上');
		console.log("up");
	} else if (key == 'd') {
		knn.addExample(logits, '下');
		console.log("down");
	} else if (key == ' ') {
		knn.addExample(logits, '止');
		console.log("stay");
	} else if (key == 's') {
		knn.save("model.json");
	}
	//console.log(logits);
	//console.log(logits.dataSync());
	//logits.print();
}

function modelReady() {
	console.log('MobileNet Loaded!');
	knn = ml5.KNNClassifier();
	knn.load("model.json", function() {
		console.log("KNN Data Loaded!");
		goClassify();
	});
}

function draw() {
	background(0);
	fill(255);
	let size = 36;
	ellipse(x, y, size);
	//image(video, 0, 0);

	if (label == "上") {
		y--;
	} else if (label == "下") {
		y++;
	} else if (label == "右") {
		x++;
	} else if (label == "左") {
		x--;
	}

	x = constrain(x, size/2, width - size/2);
	y = constrain(y, size/2, height - size/2);
}

