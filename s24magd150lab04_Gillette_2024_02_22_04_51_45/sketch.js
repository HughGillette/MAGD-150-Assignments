x = 30
function setup() {
  createCanvas(400, 400);
  background(0);


push();
fill(150, 100, 0)
ellipse(200, 200, 300, 300)
pop();  
push();
fill(255, 220, 0);
ellipse(200, 200, 275, 275);
pop();

  
}


function draw(){


push();
if (mouseIsPressed === true){
fill(150, 0, 0);
ellipse(mouseX, mouseY, 50, 50);
}else{
}
pop();

push();
if (keyIsPressed){
  if (keyCode == LEFT_ARROW)
background(0);
fill(150, 100, 0)
ellipse(200, 200, 300, 300)
pop();
push();
fill(255, 220, 0);
ellipse(200, 200, 275, 275);
pop();
}


push();

if (keyCode == RIGHT_ARROW){
fill(165, 60, 60)
ellipse(mouseX, mouseY, 25, 25)
pop();
}else{
}
}