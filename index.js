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
	softSquishImg = loadImage('squish2.png');    // For "soft squish"
	owImg = loadImage('squish3.png');            // For "OW OW OW"
	stopImg = loadImage('squish4.png');          // For "STOP IT HE HAS HAD ENOUGH"
}

function setup() {
	createCanvas(320, 480); // 240 (video) + 240 (image)
	video = createCapture(VIDEO);
	video.size(320, 240);
	video.hide();
	classifyVideo();
}

function draw() {
	background(0);

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

	// Draw the image on top if it exists
	if (imgToShow) {
		image(imgToShow, 0, 0, 320, 240); // Draw image at the top
	}

	// Draw the video below the image
	image(video, 0, 240); // Draw video below the image

	// Show label below the video
	fill(255);
	textSize(14);
	textAlign(CENTER);
	text(label, width / 2, height - 10);
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
