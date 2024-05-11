let on = false;
let playButton = false;
let blueBallVisible = false; 

let powerX = 70;
let powerY = 125;
let powerSize = 50;

let playX = 30;
let playY = 175;
let playWidth = 85;
let playHeight = 50;

let circleX = 170; 
let circleY = 250; 
let circleSpeed = 2;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);

  push();
  strokeWeight(5);
  fill(0, 0, 255);
  rect(25, 90, 95, 250);
  push();
  
  push();
  strokeWeight(5);
  fill(50);
  rect(150, 150, 300, 200);
  strokeWeight(2);
  line(250, 100, 300, 150);
  line(350, 100, 300, 150);
  pop();

  
  strokeWeight(2);
  if (on) {
    fill(200);
  } else {
    fill(255);
  }
  ellipse(powerX, powerY, powerSize);

  // Play button
  if (playButton) {
    fill(200);
  } else {
    fill(255);
  }
  rect(playX, playY, playWidth, playHeight);

  // Button labels
  fill(0);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Power", powerX, powerY);
  text("Play", playX + playWidth / 2, playY + playHeight / 2);

  
  if (playButton) {
    circleX += circleSpeed;
    if (circleX > 435) {
      circleX = 170; 
    }
  }

  
  circleY = 250 + 50 * sin(frameCount * 0.05);

  
  if (blueBallVisible && on) {
    fill(100, 100, 255);
    ellipse(circleX, circleY, 30);
  }
}

function mousePressed() {
  
  let dPower = dist(mouseX, mouseY, powerX, powerY);
  if (dPower < powerSize / 2) {
    on = !on; 
    if (on) {
      screenColor = 200; 
    } else {
      screenColor = 255; 
    }
    blueBallVisible = on; 
  }

 
  if (
    mouseX > playX &&
    mouseX < playX + playWidth &&
    mouseY > playY &&
    mouseY < playY + playHeight
  ) {
    playButton = !playButton; 
  }
}

function mouseMoved() {
 
  if (dist(mouseX, mouseY, powerX, powerY) < powerSize / 2) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
