//This code prints flowers at random places when ran. 

//This randomizes the colors of the flowers and sets up my class function (Flower)
class Flower {
    constructor(x, y) {
        this.x = x; 
        this.y = y; 
        this.size = random(20, 40); 
        this.color = color(random(255), random(255), random(255)); 
        this.numPetals = int(random(5, 12)); 
    }

  //This randomizes the flowers (size, location, and amount of flowers)
    display() {
        
        stroke(0, 128, 0); 
        strokeWeight(2);
        line(this.x, height - grassHeight, this.x, this.y - this.size * 0.7);

        
        fill(this.color);
        for (let i = 0; i < this.numPetals; i++) { 
            let angle = map(i, 0, this.numPetals, 0, TWO_PI); 
            let petalSize = this.size * 0.7; 
            let petalX = this.x + cos(angle) * petalSize; 
            let petalY = this.y + sin(angle) * petalSize; 
            ellipse(petalX, petalY, petalSize, petalSize); 
        }
        
        fill(255, 255, 0);
        ellipse(this.x, this.y, this.size * 0.7, this.size * 0.7);
    }
}


let flowers = []; 
let grassHeight = 100; 
//This sets up the grass on the screen
function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < 10; i++) { 
        let x = random(width); 
        let y = random(0, height - grassHeight); 
        flowers.push(new Flower(x, y)); 
    }
}

function draw() {
    background(135, 206, 250); 

    
    fill(0, 128, 0); 
    noStroke();
    rect(0, height - grassHeight, width, grassHeight); 

    for (let flower of flowers) { 
        flower.display(); 
    }
}