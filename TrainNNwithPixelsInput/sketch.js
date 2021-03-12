// The video and pixel scale
let video;
let videoSize = 10;
let ready = false;

let pixelBrain;
let label = "";

function setup() {
    createCanvas(400, 400);
    video = createCapture(VIDEO, videoReady);
    video.size(videoSize, videoSize);
    video.hide();

    let options = {
        inputs: videoSize * videoSize * 3,
        outputs: 2,
        task: 'classification',
        debug: true
    }
    pixelBrain = ml5.neuralNetwork(options);
    pixelBrain.loadData('data.json', loaded);
}

function loaded() {
    console.log('loaded');
    pixelBrain.train({epochs: 50}, finishedTraining);
}

// Training is done!
function finishedTraining() {
    console.log("Training complete!");
    classifyVideo();
}

function classifyVideo() {
    let inputs = [];
    video.loadPixels();
    for(let i = 0; i < video.pixels.length; i+=4) {
        let r = video.pixels[i + 0] / 255;
        let g = video.pixels[i + 1] / 255;
        let b = video.pixels[i + 2] / 255;
        inputs.push(r, g, b);
    }
    pixelBrain.classify(inputs, gotResults);
}

function gotResults(error, results) {
    if(error) {
        return;
    }
    label = results[0].label;
    classifyVideo();
}

function keyPressed() {
    if(key == 't') {
        pixelBrain.train({epochs: 50}, finishedTraining);
    } else if(key == 's') {
        pixelBrain.saveData();
    } else {
        addExample(key);
    }
}

// Add example
function addExample(label) {
    let inputs = [];
    video.loadPixels();
    //let inputs = video.pixels.filter((val, i) => i % 4 !== 3);
    for(let i = 0; i < video.pixels.length; i+=4) {
        let r = video.pixels[i + 0] / 255;
        let g = video.pixels[i + 1] / 255;
        let b = video.pixels[i + 2] / 255;
        inputs.push(r, g, b);
    }
    let target = [label];
    console.log("Adding example: " + label);
    pixelBrain.addData(inputs, target);

}

// Video is ready!
function videoReady() {
    ready = true;
}

function draw() {
    background(0);
    if(ready) {
        // Render the low-res image
        let w = width / videoSize;
        video.loadPixels();
        for(let x = 0; x < video.width; x++) {
            for(let y = 0; y < video.height; y++) {
                let index = (x + y * video.width) * 4;
                let r = video.pixels[index + 0];
                let g = video.pixels[index + 1];
                let b = video.pixels[index + 2];
                noStroke();
                fill(r, g, b);
                rect(x * w, y * w, w, w);
            }
        }
    }

    if(label == 'h') {
        textSize(64);
        textAlign(CENTER, CENTER);
        fill(255);
        text("Hi!", width / 2, height / 2);
    } else {
        textSize(40);
        textAlign(CENTER, CENTER);
        fill(255);
        text("Where are you?", width / 2, height / 2);
    }
}