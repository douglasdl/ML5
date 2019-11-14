// KNN Classification

let x, y;

let video;
let features;
let knn;
let labelP;
let ready = false;
let label = "";


// Snake
var s;			// snake instance
var scl = 20;	// scale
var food;



function setup() {
	createCanvas(400, 400); 
	video = createCapture(VIDEO);
	video.size(400, 400);
	video.style("transform", "scale(-1,1)");
	//video.hide();
	features = ml5.featureExtractor('MobileNet', modelReady);

	labelP = createP("need trining data");
	labelP.style("font-size", "32pt");

	x = width / 2;
	y = height / 2;


	// Snake
	//createCanvas(400, 400); 
	s = new Snake();
	frameRate(1);
	pickLocation();


}

function pickLocation() {
	var cols = floor(width / scl);
	var rows = floor(height / scl);
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

// Cheat
function mousePressed() {
	s.total++;
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
	} else if(keyCode == UP_ARROW) {
		s.dir(0, -1);
	} else if(keyCode == DOWN_ARROW) {
		s.dir(0, 1);
	} else if(keyCode == LEFT_ARROW) {
		s.dir(-1, 0);
	} else if(keyCode == RIGHT_ARROW) {
		s.dir(1, 0);
	}
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
	//background(0);
	fill(255);
	let size = 36;
	ellipse(x, y, size);

	if (label == "上") {
		y--;
		s.dir(0, -1);
	} else if (label == "下") {
		y++;
		s.dir(0, 1);
	} else if (label == "右") {
		x++;
		s.dir(1, 0);
	} else if (label == "左") {
		x--;
		s.dir(-1, 0);
	}

	x = constrain(x, size/2, width - size/2);
	y = constrain(y, size/2, height - size/2);



	// Snake
	background(51);
	
	if(s.eat(food)) {
		pickLocation();
	}
	s.death();
	s.update();
	s.show();

	fill(255, 0, 100);
	rect(food.x, food.y, scl, scl);
}

