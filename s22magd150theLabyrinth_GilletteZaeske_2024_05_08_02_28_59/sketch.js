class Minotaur {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.speed = 1.5; 
    this.nextMove = { x: startX, y: startY }; 
  }

  chasePlayer(player) {
    
    let dx = player.x - this.x;
    let dy = player.y - this.y;

    
    let distance = Math.sqrt(dx * dx + dy * dy);
    dx /= distance || 1;
    dy /= distance || 1;

    
    let nextX = this.x + dx * this.speed * 0.5; 
    let nextY = this.y + dy * this.speed * 0.5; 

    
    if (!isValidMove(nextX, nextY)) {
      if (Math.abs(dx) > Math.abs(dy)) {
        
        nextX = this.x + Math.sign(dx) * this.speed * 0.5;
        nextY = this.y;
        
        if (!isValidMove(nextX, nextY)) {
          nextX = this.x;
          nextY = this.y + Math.sign(dy) * this.speed * 0.5;
        }
      } else {
        
        nextX = this.x;
        nextY = this.y + Math.sign(dy) * this.speed * 0.5;
        
        if (!isValidMove(nextX, nextY)) {
          nextX = this.x + Math.sign(dx) * this.speed * 0.5;
          nextY = this.y;
        }
      }
    }

    
    if (isValidMove(nextX, nextY)) {
      this.nextMove.x = nextX;
      this.nextMove.y = nextY;
    }
  }

  move() {
    
    this.x = this.nextMove.x;
    this.y = this.nextMove.y;
  }

  show() {
    // Body
    fill(255, 0, 0);
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);

    // Head
    fill(255);
    ellipse((this.x + 0.5) * tileSize, (this.y + 0.25) * tileSize, tileSize * 0.6);

    // Eyes
    fill(0);
    ellipse((this.x + 0.4) * tileSize, (this.y + 0.2) * tileSize, tileSize * 0.1);
    ellipse((this.x + 0.6) * tileSize, (this.y + 0.2) * tileSize, tileSize * 0.1);

    // Mouth
    noFill();
    stroke(0);
    strokeWeight(2);
    arc((this.x + 0.5) * tileSize, (this.y + 0.4) * tileSize, tileSize * 0.4, tileSize * 0.3, 0, PI);
  }
}

let maze;
let player;
let minotaur;
let victorySquare;
let playerMoves = 0; 
const tileSize = 20; 
const mazeSize = 20; 

function setup() {
  createCanvas(tileSize * mazeSize, tileSize * mazeSize);
  maze = generateMaze();
  player = new Player();
  minotaur = new Minotaur(floor(mazeSize / 2), floor(mazeSize / 2)); 

  
  do {
    victorySquare = createVector(floor(random(mazeSize)), floor(random(mazeSize)));
  } while (!hasPathToExit(player.x, player.y, victorySquare.x, victorySquare.y));
}
 
function draw() {
  background(0, 170, 0);
  drawMaze();
  player.update();
  player.show();
  if (playerMoves >= 2) {
    minotaur.chasePlayer(player); 
    minotaur.move(); 
    playerMoves = 0; 
  }
  minotaur.show();
  
  
  if (Math.abs(player.x - minotaur.x) < 1 && Math.abs(player.y - minotaur.y) < 1) {
    gameOver("Defeat");
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    player.move(0, -1);
    playerMoves++;
  } else if (keyCode === DOWN_ARROW) {
    player.move(0, 1);
    playerMoves++;
  } else if (keyCode === LEFT_ARROW) {
    player.move(-1, 0);
    playerMoves++;
  } else if (keyCode === RIGHT_ARROW) {
    player.move(1, 0);
    playerMoves++;
  }
}

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.moved = false; 
  }

  move(dx, dy) {
    
    let newX = this.x + dx;
    let newY = this.y + dy;
    if (isValidMove(newX, newY)) {
      this.x = newX;
      this.y = newY;
      this.moved = true; 
      
      if (this.x === victorySquare.x && this.y === victorySquare.y) {
        gameOver("Victory");
      }
    }
  }

  update() {
   
    this.moved = false;
  }

  show() {
    // Head
    fill(0, 0, 255);
    ellipse((this.x + 0.5) * tileSize, (this.y + 0.25) * tileSize, tileSize * 0.4);

    // Body
    line((this.x + 0.5) * tileSize, (this.y + 0.5) * tileSize, (this.x + 0.5) * tileSize, (this.y + 0.9) * tileSize);

    // Arms
    line((this.x + 0.3) * tileSize, (this.y + 0.6) * tileSize, (this.x + 0.7) * tileSize, (this.y + 0.6) * tileSize);

    // Legs
    line((this.x + 0.5) * tileSize, (this.y + 0.9) * tileSize, (this.x + 0.3) * tileSize, (this.y + 1.2) * tileSize);
    line((this.x + 0.5) * tileSize, (this.y + 0.9) * tileSize, (this.x + 0.7) * tileSize, (this.y + 1.2) * tileSize);
  }

  hasMoved() {
    return this.moved;
  }
}

function generateMaze() {
  let maze = [];
  for (let i = 0; i < mazeSize; i++) {
    maze.push(new Array(mazeSize).fill(0));
  }
  
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      if (random(1) < 0.3) { 
        maze[i][j] = 1;
      }
    }
  }
  
  maze[0][0] = 0;
  maze[mazeSize - 1][mazeSize - 1] = 0;
  return maze;
}

function drawMaze() {
  for (let i = 0; i < mazeSize; i++) {
    for (let j = 0; j < mazeSize; j++) {
      if (maze[i][j] === 1) {
        fill(0);
        rect(j * tileSize, i * tileSize, tileSize, tileSize);
      } else if (j === victorySquare.x && i === victorySquare.y) {
        fill(255); 
        rect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
    }
  }
}

function gameOver(outcome) {
  fill(0);
  textSize(50);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  fill(0, 208, 180);
  if (outcome === "Victory") {
    text("Victory!", width / 2, height / 2);
  } else if (outcome === "Defeat") {
    fill(255,0,0);
    text("Defeat!", width / 2, height / 2);
  }
  noLoop(); 
}

function isValidMove(x, y) {
  
  x = Math.floor(x);
  y = Math.floor(y);
  
  
  if (x < 0 || x >= mazeSize || y < 0 || y >= mazeSize) {
    return false;
  }
  
  
  return maze[y][x] !== 1;
}

function hasPathToExit(startX, startY, targetX, targetY) {
  let visited = [];
  for (let i = 0; i < mazeSize; i++) {
    visited.push(new Array(mazeSize).fill(false));
  }

  let queue = [];
  queue.push({ x: startX, y: startY });
  visited[startY][startX] = true;

  while (queue.length > 0) {
    let current = queue.shift();

    if (current.x === targetX && current.y === targetY) {
      return true;
    }

    for (let neighbor of getNeighbors(current.x, current.y)) {
      let nx = neighbor.x;
      let ny = neighbor.y;
      if (nx >= 0 && nx < mazeSize && ny >= 0 && ny < mazeSize && !visited[ny][nx] && maze[ny][nx] !== 1) {
        queue.push({ x: nx, y: ny });
        visited[ny][nx] = true;
      }
    }
  }

  return false;
}

function getNeighbors(x, y) {
  return [
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y - 1 },
    { x: x, y: y + 1 }
  ];
}