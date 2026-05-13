let jogo;
let imgBackground;

function preload() {
    imgBackground = loadImage("assets/background.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  jogo = new Jogo();
  jogo.tabuleiro.imgFundo = imgBackground;
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