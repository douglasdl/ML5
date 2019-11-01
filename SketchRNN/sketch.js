// SketchRNN
let sketchRNN;
let currentStroke;
let x, y;
let nextPen = 'down';
let seedPath = [];
let personDrawing = false;

function preload() {
	sketchRNN = ml5.sketchRNN('cat');

}

function startDrawing() {
    personDrawing = true;
    x = mouseX;
    y = mouseY;
}

function sketchRNNStart() {
    personDrawing = false;
    sketchRNN.generate(seedPath, gotStrokePath);
}

function setup() {
	let canvas = createCanvas(400, 400); 
    canvas.mousePressed(startDrawing);
    canvas.mouseReleased(sketchRNNStart);
    background(255);
	console.log('model loaded');
}

function gotStrokePath(error, strokePath) {
    console.log(strokePath);
    currentStroke = strokePath;
}
  
function draw() {
    stroke(0);
    strokeWeight(4);
    if(personDrawing) {
        let strokePath = {
            dx: mouseX - pmouseX,
            dy: mouseY - pmouseY,
            pen: 'down'
        }
        line(x, y, x + strokePath.dx, y + strokePath.dy);
        x += strokePath.dx;
        y += strokePath.dy;
      
        seedPath.push(strokePath);
    }
  
    if(currentStroke) {
        if(nextPen == 'end') {
            noLoop();
            //sketchRNN.reset();
            //sketchRNNStart();
            return;
        }
        if(nextPen == 'down') {
            line(x, y, x + currentStroke.dx, y + currentStroke.dy);
        }
        x += currentStroke.dx;
        y += currentStroke.dy;
        nextPen = currentStroke.pen;
        currentStroke = null;
        sketchRNN.generate(gotStrokePath);
    }
}