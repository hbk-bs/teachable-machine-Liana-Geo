// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/eQxMXMly8/';

// Video
let video;
// To store the classification
let label = '';

// Images for each motion
let images = {
    "Motion1": "images/squish1.png",
    "Motion2": "images/squish2.png",
    "Motion3": "images/squish3.png",
    "Motion4": "images/squish4.png",
};

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    createCanvas(320, 260);
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    // Start classifying
    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    image(video, 0, 0);

    // Display the corresponding image for the detected motion
    if (label in images) {
        let img = loadImage(images[label], () => {
            image(img, 0, 0, width, height);
        });
    }

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    label = results[0].label;
    // Classify again!
    classifyVideo();
}
