// Teachable Machine
// Douglas

// The video
let video;
// For displaying the label
let label = "waiting...";
// The classifier
let classifier;
//let modelURL = 'https://teachablemachine.withgoogle.com/models/-IX_tfcs/';
let modelURL = 'https://teachablemachine.withgoogle.com/models/P9hTqVnh/';
// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();
}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  // Draw the video
  //image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);

  // Pick an emoji, the "default" is train
  let emoji = "";
  if (label == "Copo") {
    emoji = "🥃";
  } else if (label == "Cafe") {
    emoji = "☕";
  } else if (label == "iPhone") {
    emoji = "📱";
  } else if (label == "Oculos") {
    emoji = "👓";
  } else if (label == "Mizaru") {
    //label = "見ざる";
    emoji = "🙈";
  } else if (label == "Kikazaru") {
    //label = "聞かざる";
    emoji = "🙉";
  } else if (label == "Iwazaru") {
    //label = "言わざる";
    emoji = "🙊";
  }

  // Draw the emoji
  textSize(256);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  label = results[0].label;
  classifyVideo();
}
