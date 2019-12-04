let nn;
let lr_slider;

// XOR
let training_data1 = [
	{
		inputs: [0, 0],
		outputs: [0]
	},
	{
		inputs: [0, 1],
		outputs: [1]
	},
	{
		inputs: [1, 0],
		outputs: [1]
	},
	{
		inputs: [1, 1],
		outputs: [0]
	}
];

// AND
let training_data = [
	{
		inputs: [0, 0],
		outputs: [0]
	},
	{
		inputs: [0, 1],
		outputs: [0]
	},
	{
		inputs: [1, 0],
		outputs: [0]
	},
	{
		inputs: [1, 1],
		outputs: [1]
	}
];

// OR
let training_data3 = [
	{
		inputs: [0, 0],
		outputs: [0]
	},
	{
		inputs: [0, 1],
		outputs: [1]
	},
	{
		inputs: [1, 0],
		outputs: [1]
	},
	{
		inputs: [1, 1],
		outputs: [1]
	}
];

function setup() {
	createCanvas(400, 400);
	nn = new NeuralNetwork(2, 7, 1);
	lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);

}


function draw() {
	background(0);

	for(let i = 0; i < 1000; i++) {
		let data = random(training_data);
		nn.train(data.inputs, data.outputs);
	}

	nn.setLearningRate(lr_slider.value());

	let resolution = 20
	;
	let cols = width / resolution;
	let rows = height / resolution;
	for(let i = 0; i < cols; i++) {
		for(let j = 0; j < rows; j++) {
			let x1 = i / cols;
			let x2 = j / rows;
			let inputs = [x1, x2];
			let y = nn.predict(inputs);

			noStroke();
			//fill(random(y * 255));
			fill(y * 255);
			rect(i*resolution, j*resolution, resolution, resolution);
		}
	}

}

