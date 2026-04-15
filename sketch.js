let jogo;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jogo = new Jogo();
}

function draw() {
  background(200);
  jogo.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  jogo.mousePressed(mouseX, mouseY);
}