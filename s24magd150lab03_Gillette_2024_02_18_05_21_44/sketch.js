
var bubbles = 50;
var bubbles2 = 50.5;
var bubbles3 = 50;
var r=0;
var g=0; 
var b= 0;
var flipFlopper = false; 
var deltaMouseX; 
var deltaMouseY;


function setup() {
  createCanvas(400, 400);
  background(0, 0, 255);
  print('Bubbles');
  print('\nBubbles');
}






function draw() {

push();
fill(r, g, b);
ellipse(mouseX, mouseY, 50 , bubbles2);
  r = (r + 1) % 256;
  g = (g + 5) % 256;
  b = (b + 2) % 256; 
pop();

push();
fill(r, g, b);
ellipse(bubbles, 50, 50, 50)
bubbles = bubbles + 0.1;
  r = (r + 7) % 256;
  g = (g + 2) % 256;
  b = (b + 4) % 256; 
pop();

  deltaMouseX = mouseX - pmouseX;
  deltaMouseY = mouseY - pmouseY;

  print("delta: (" + deltaMouseX + ", " + deltaMouseY + ")");

  flipFlopper = !flipFlopper;
  print("flippFlopper = " + flipFlopper);
  
  
  
  
}


function mousePressed() {

background(0, 0, 255);
  
  
  
  
}