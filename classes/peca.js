class Peca {
    constructor(tipo, cor) {
        this.tipo = tipo;
        this.cor = cor;
        this.raio = 15;
    }

    draw(x, y) {
        fill(this.cor);
        stroke(0);
        ellipse(x, y, this.raio * 2, this.raio * 2);
    }
}