// Train Your Own Neural Network
// Douglas

let model;
let tagetLabel = 'C';

function setup() {
  createCanvas(400, 400);
  
  let options = {
    inputs: ['x', 'y'],
    outputs: ['label'],
    task: 'classification'
  };
  model = ml5.neuralNetwork(options);

}

function keyPressed() {
  targetLabel = key;
}

function mousePressed() {
  stroke(0);
  noFill();
  ellipse(mouseX, mouseY, 24);
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  text(targetLabel, mouseX, mouseY);

}

function draw() {
  background(100);
}