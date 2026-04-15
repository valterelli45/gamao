class Peca {
    constructor(x, y, cor) {
        this.x = x;
        this.y = y;
        this.cor = cor;
        this.raio = 20;
    }

    draw() {
        fill(this.cor);
        ellipse(this.x, this.y, this.raio, this.raio);
    }
}