class Tabuleiro {
    constructor() {
        // margem do tabuleiro
        this.margem = 50;
    }

    draw() {
        this.desenharFundo();
        this.desenharTriangulos();
        this.desenharBarra();
    }

    // FUNDO
    desenharFundo() {
        fill(210, 180, 140);
        rect(0, 0, width, height);
    }

    // TRIÂNGULOS (24 pontos)
    desenharTriangulos() {
        let w = width - this.margem * 2;
        let h = height - this.margem * 2;
        let passo = w / 12;

        for (let i = 0; i < 12; i++) {

            // PARTE DE CIMA (esquerda → direita)
            let corCima = (i % 2 == 0) ? 255 : 0;

            fill(corCima);

            triangle(
                this.margem + i * passo, this.margem,
                this.margem + (i + 1) * passo, this.margem,
                this.margem + (i + 0.5) * passo, this.margem + h / 2
            );

            // PARTE DE BAIXO (direita → esquerda)
            let j = 11 - i; // inverso só para baixo

            let corBaixo = (i % 2 == 0) ? 255 : 0;

            fill(corBaixo);

            triangle(
                this.margem + j * passo, height - this.margem,
                this.margem + (j + 1) * passo, height - this.margem,
                this.margem + (j + 0.5) * passo, height - this.margem - h / 2
            );
        }
    }

    // BARRA CENTRAL
    desenharBarra() {
        fill(120);
        rect(width / 2 - 10, this.margem, 20, height - this.margem * 2);
    }

    // POSIÇÃO DAS PEÇAS (fake layout)
    getPosicao(ponto, i) {

        let w = width - this.margem * 2;
        let h = height - this.margem * 2;

        let passo = w / 12;

        let x, y;

        // -------------------
        // PARTE DE CIMA (0–11)
        // -------------------
        if (ponto < 12) {

            x = this.margem + (11 - ponto) * passo + passo / 2;
            y = this.margem + 40 + i * 18;

            // -------------------
            // PARTE DE BAIXO (12–23)
            // -------------------
        } else {

            let p = ponto - 12;

            x = this.margem + p * passo + passo / 2;
            y = height - this.margem - 40 - i * 18;
        }

        return { x, y };
    }
}