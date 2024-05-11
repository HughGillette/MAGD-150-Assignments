//This program runs an eyeball on screen which moves based on the directional arrow keys
let eyeballX, eyeballY;
let rotationAngle;
let scaleFactor = 1.0;

function setup() {
  createCanvas(400, 400);
  background(0);
  
  // This is the eyeball's position, rotation angle, and scale factor
  eyeballX = width / 2;
  eyeballY = height / 2;
  rotationAngle = 0;
}

function draw() {
 
  background(0);
  
  scale(scaleFactor);
  
  
  drawEyeball(eyeballX, eyeballY, color(0, 255, 0)); // Green iris
  
  // Move the eyeball according to keyboard input
  moveEyeball();
  
  
  rotateEyeball();
}


function drawEyeball(centerX, centerY, irisColor) {
  fill(255); // White for eyeball
  ellipse(centerX, centerY, 50, 50);
  
  fill(irisColor);
  ellipse(centerX, centerY, 20, 20); // Iris
}

// Function to move the eyeball according to keyboard input
function moveEyeball() {
  
  if (keyIsDown(LEFT_ARROW)) {
    eyeballX -= 5;
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    eyeballX += 5;
  }
  
  if (keyIsDown(UP_ARROW)) {
    eyeballY -= 5;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    eyeballY += 5;
  }
}

// Function to rotate the eyeball according to mouse input
function rotateEyeball() {
  
  let mouseXRatio = mouseX / width; 
  rotationAngle = mouseXRatio * TWO_PI; 
  
  
  push();
  translate(eyeballX, eyeballY);
  rotate(rotationAngle);
  drawEyeball(0, 0, color(0, 255, 0)); // Green iris
  pop();
}


function mouseWheel(event) {
 
  if (event.delta > 0) {
    scaleFactor += 0.1;
  } else {
    scaleFactor -= 0.1;
  }
}

// Function to rotate the eyeball according to mouse input
function rotateEyeball() {
  let mouseXRatio = mouseX / width; 
  rotationAngle = mouseXRatio * TWO_PI; 
  
 
  push();
  translate(eyeballX, eyeballY);
  rotate(rotationAngle);
  drawEyeball(0, 0, color(0, 255, 0));
  pop();
}