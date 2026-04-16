class Dado {
    constructor() {
        this.valor = 1;
    }

    lancar() {
        this.valor = int(random(1, 7));
    }

    draw(x, y) {

        fill(255);
        rect(x, y, 40, 40);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(16);

        text(this.valor, x + 20, y + 20);
    }
}