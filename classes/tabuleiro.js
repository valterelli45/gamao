class Tabuleiro {
    constructor() {
        this.margem = 50;
    }

    draw() {
        this.desenhaFundo();
    }

    desenhaFundo() {
        fill(180);
        rect(this.margem, this.margem, width - 2*this.margem, height - 2*this.margem);
    }
}