// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/eQxMXMly8/';

// Video
let video;
// To store the classification
let label = '';

// Images for each category
let squishImg, softSquishImg, owImg, stopImg;

function preload() {
	classifier = ml5.imageClassifier(imageModelURL + 'model.json');

	// Load images for each label (make sure the file names match your actual images)
	squishImg = loadImage('squish1.png');        // For "squish the hamster!!"
	softSquishImg = loadImage('squish2.png');      // For "soft squish"
	owImg = loadImage('squish3.png');                // For "OW OW OW"
	stopImg = loadImage('squish4.png');            // For "STOP IT HE HAS HAD ENOUGH"
}

function setup() {
	createCanvas(320, 260);
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();
	classifyVideo();
}

function draw() {
	background(0);
	image(video, 0, 0);

	// Show label
	fill(255);
	textSize(14);
	textAlign(CENTER);
	text(label, width / 2, height - 4);

	// Pick the image based on the label
	let imgToShow;

	if (label === 'squish the hamster!!') {
		imgToShow = squishImg;
	} else if (label === 'soft squish') {
		imgToShow = softSquishImg;
	} else if (label === 'OW OW OW') {
		imgToShow = owImg;
	} else if (label === 'STOP IT HE HAS HAD ENOUGH') {
		imgToShow = stopImg;
	}

	// Show the image if it exists
	if (imgToShow) {
		image(imgToShow, 210, 10, 100, 100); // Show in top-right corner
	}
}

function classifyVideo() {
	classifier.classify(video, gotResult);
}

function gotResult(results) {
	if (results && results[0]) {
		label = results[0].label;
	}
	classifyVideo();
}
