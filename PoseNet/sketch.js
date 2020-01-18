let video;
let poseNet;
let pose;
let skeleton;

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
	//console.log(poses);
	if(poses.length > 0) {
		pose = poses[0].pose;
		skeleton = poses[0].skeleton;
	}
}

function modelLoaded() {
	console.log("Posenet is ready");
}

function draw() {
	image(video, 0, 0);

	if(pose) {
		// Variables
		let eyeR = pose.rightEye;
		let eyeL = pose.leftEye;
		
		let earR = pose.rightEar;
		let earL = pose.leftEar;
		
		let nose = pose.nose;

		// Distances		
		let d2 = dist(nose.x, eyeR.y, nose.x, nose.y);; // H nariz, olhos
		let d3 = d2/2; // H nariz, boca
		let d4 = d3*2; // H boca queixo
		let d5 = dist(earR.x, earR.y, earL.x, earL.y); // W orelha, orelha
		let d6 = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y); // W olho, olho 			3
		let d0 = d6; // H orelha, testa											3
		let d1 = d0/3*4; // H olhos, testa										4
		let d7 = d6*0.6; // Largura da boca
		let d8 = d0/3*2; // Largura de cada olho
		let d9 = d8*1; // Largura do nariz
		let d10 = d9*3; // Largura da bochecha (Contorno da cabeça na altura boca)
		
		// Cabeça
		fill(255, 229, 200);
		stroke(0, 0, 0);
		strokeWeight(1);
		ellipse(earR.x+d5/2, earR.y, d5*1, (d1+d2+d3+d4)*1);

		// Olhos
		strokeWeight(1);
		fill(255, 255, 255);
		stroke(0, 0, 0);
		ellipse(eyeL.x, eyeL.y, d6*0.5);
		ellipse(eyeR.x, eyeR.y, d6*0.5);
		fill(0, 0, 0);
		stroke(0, 0, 0);
		ellipse(eyeL.x, eyeL.y, d6*0.15);
		ellipse(eyeR.x, eyeR.y, d6*0.15);

		// Nariz
		fill(255, 0, 0);
		noStroke();
		ellipse(nose.x, nose.y, d9);

		// Orelhas
		
		
		fill(0, 0, 255);
		noStroke();
		ellipse(earL.x, earL.y, 10);
		ellipse(earR.x, earR.y, 10);

		// Boca
		// strokeWeight(1);
		// stroke(0, 0, 0);
		// line(nose.x-d7/2, nose.y+d3, nose.x+d7/2, nose.y+d3);


		// Points
		ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10);
		ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10);
		ellipse(pose.leftElbow.x, pose.leftElbow.y, 10);
		ellipse(pose.rightElbow.x, pose.rightElbow.y, 10);
		ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
		ellipse(pose.rightWrist.x, pose.rightWrist.y, 10);
		ellipse(pose.leftHip.x, pose.leftHip.y, 10);
		ellipse(pose.rightHip.x, pose.rightHip.y, 10);
		ellipse(pose.leftKnee.x, pose.leftKnee.y, 10);
		ellipse(pose.rightKnee.x, pose.rightKnee.y, 10);
		ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 10);
		ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 10);

		// Lines
		stroke(0, 0, 0);
		strokeWeight(10);
		line(pose.leftShoulder.x, pose.leftShoulder.y, pose.rightShoulder.x, pose.rightShoulder.y);
		line(pose.rightAnkle.x, pose.rightAnkle.y, pose.leftAnkle.x, pose.leftAnkle.y);

		// Loop all the points
		for(let i = 0; i < pose.keypoints.length; i++) {
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;

			// strokeWeight(1);
			// fill(0, 255, 0);
			// stroke(0, 0, 0);
			// ellipse(x, y, 10);
		}

		// All Skeleton Lines
		for(let i = 0; i < skeleton.length; i++) {
			let a = skeleton[i][0];
			let b = skeleton[i][1];
			stroke(0, 0, 0);
			strokeWeight(10);
			line(a.position.x, a.position.y, b.position.x, b.position.y);
		}

	}
}
