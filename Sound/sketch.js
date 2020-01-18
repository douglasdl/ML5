var song;
var sliderVolume;
var sliderRate; // Speed
var sliderPan;	// R L Sound moviment

// function preload() {
// 	song = loadSound("Yakov_Golman_-_05_-_Japan.mp3");
// }

function setup() {
	createCanvas(200, 200);
	song = loadSound("Yakov_Golman_-_05_-_Japan.mp3", loaded);
	sliderVolume = createSlider(0, 1, 0.5, 0.01);
	sliderRate = createSlider(0, 2, 1, 0.01);
	sliderPan = createSlider(-1, 1, 0, 0.01);
}

function loaded() {
	song.play();
}
	

function draw() {
	background(0);
	song.setVolume(sliderVolume.value());
	song.pan(sliderPan.value());
	song.rate(sliderRate.value());
}
