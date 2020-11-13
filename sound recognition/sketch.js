// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/3-teachable-audio
// https://editor.p5js.org/codingtrain/sketches/e3nrNMG7A

//bla bla
let lang = 'vi-VN';
let speechRec = new p5.SpeechRec(lang, gotSpeech);

let continuous = true;
let interim = false;
let label = "waiting...";

// Storing the label
let printText = "waiting...";

// Classifier and model url
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/1dr7RiaNr/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.soundClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(690, 520);
  console.log(lang);
  speechRec.start(continuous, interim);
  // STEP 2: Start classifying (will listen to mic by default)
  classifyAudio();
}

// STEP 2 classify!
function classifyAudio() {
  classifier.classify(gotResults);
}

function draw() {
  background(220);

  // STEP 4: Draw the label
  // textSize(32);
  textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width/2, height - 16);

  // Background noise is headphones
  let emoji = "🔊";
  // Pick an emoji based on label
  if (label == "cho") {
    emoji = "🐶";
  } else if (label == "khancap") {
    emoji = "🚨";
  } else if (label == "baby") {
    emoji = "👶";
  } else if (label == "sung"){
    emoji = "🔫";
  }
  console.log(label);

  // Draw the emoji
  textSize(150);
  text(emoji, width / 2, 170);

  fill(0);
  noStroke();
  textSize(40);
  //textAlign(CENTER, CENTER);
  text(printText, width / 2, 380);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label
  //if (results[0].label > 0.2) 
    label = results[0].label;
  console.log(results[0].label);
}
function gotSpeech() {
  if (speechRec.resultValue) {
    //createP(speechRec.resultString);
    console.log(speechRec.resultString);
    printText = speechRec.resultString;
  }
}
/*
let lang = 'vi-VN';
let speechRec = new p5.SpeechRec(lang, gotSpeech);

let continuous = true;
let interim = false;

function setup() {
  noCanvas();
  console.log(lang);
  speechRec.start(continuous, interim);
}

function gotSpeech() {
  if (speechRec.resultValue) {
    createP(speechRec.resultString);
    console.log(speechRec.resultString);
  }
}
*/