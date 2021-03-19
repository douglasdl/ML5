// The video and pixel scale
let video;
let videoSize = 64;
let ready = false;

let pixelBrain;
let label = "";

function setup() {
    createCanvas(700, 700);
    video = createCapture(VIDEO, videoReady);
    video.size(videoSize, videoSize);
    video.hide();


    let customLayers = [
        {
          type: 'conv2d',
          filters: 8,
          kernelSize: 5,
          strides: 1,
          activation: 'relu',
          kernelInitializer: 'varianceScaling',
        },
        {
          type: 'maxPooling2d',
          poolSize: [2, 2],
          strides: [2, 2],
        },
        {
          type: 'conv2d',
          filters: 16,
          kernelSize: 5,
          strides: 1,
          activation: 'relu',
          kernelInitializer: 'varianceScaling',
        },
        {
          type: 'maxPooling2d',
          poolSize: [2, 2],
          strides: [2, 2],
        },
        {
          type: 'flatten',
        },
        {
          type: 'dense',
          kernelInitializer: 'varianceScaling',
          activation: 'softmax',
        },
    ];
      




    let options = {
        inputs: [videoSize, videoSize, 4],
        task: 'imageClassification',
        layers: customLayers,
        debug: true
    }
    pixelBrain = ml5.neuralNetwork(options);
    //pixelBrain.loadData('data.json', loaded);
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
    let inputImage = {image: video};    
    pixelBrain.classify(inputImage, gotResults);
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
        pixelBrain.normalizeData();
        pixelBrain.train({
            epochs: 50
        }, finishedTraining);
    } else if(key == 's') {
        pixelBrain.saveData();
    } else if(key == 'm') {
        addExample('Nice mask!');
    } else if(key == 'n') {
        addExample('Wear your mask!');
    } else {
        addExample(key);
    }
}

// Add example
function addExample(label) {
    let inputImage = {image: video};    
    let target = { label };
    console.log("Adding example: " + label);
    pixelBrain.addData(inputImage, target);
}

// Video is ready!
function videoReady() {
    ready = true;
}

function draw() {
    background(0);
    if(ready) {
        image(video, 0, 0, width, height);
    }

    textSize(40);
    textAlign(CENTER, CENTER);
    fill(255);
    text(label, width / 2, height / 2);
  
}