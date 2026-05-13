class Tabuleiro {
    constructor() {
        // margem normal do tabuleiro
        this.margem = 50;

        // espaço reservado à esquerda para a interface
        this.margemEsquerda = 300;
    }

    draw() {
        this.desenharFundo();
        this.desenharTriangulos();
        this.desenharBarra();
    }

    // FUNDO
    desenharFundo() {
        image(this.imgFundo, 0, 0, width, height);
    }

    // TRIÂNGULOS (24 pontos)
    desenharTriangulos() {
        let w = width - this.margemEsquerda - this.margem;
        let h = height - this.margem * 2;
        let passo = w / 12;

        for (let i = 0; i < 12; i++) {
            // PARTE DE CIMA
            let corCima = (i % 2 == 0) ? 255 : 0;
            fill(corCima);

            triangle(
                this.margemEsquerda + i * passo, this.margem,
                this.margemEsquerda + (i + 1) * passo, this.margem,
                this.margemEsquerda + (i + 0.5) * passo, this.margem + h / 2
            );

            // PARTE DE BAIXO
            let j = 11 - i;
            let corBaixo = (i % 2 == 0) ? 255 : 0;
            fill(corBaixo);

            triangle(
                this.margemEsquerda + j * passo, height - this.margem,
                this.margemEsquerda + (j + 1) * passo, height - this.margem,
                this.margemEsquerda + (j + 0.5) * passo, height - this.margem - h / 2
            );
        }
    }

    // BARRA CENTRAL
    desenharBarra() {
        let w = width - this.margemEsquerda - this.margem;
        let centroTabuleiro = this.margemEsquerda + w / 2;

        fill(120);
        rect(centroTabuleiro - 10, this.margem, 20, height - this.margem * 2);
    }

    // POSIÇÃO DAS PEÇAS
    getPosicao(ponto, i) {
        let w = width - this.margemEsquerda - this.margem;
        let passo = w / 12;

        let x, y;

        // PARTE DE CIMA
        if (ponto < 12) {
            x = this.margemEsquerda + (11 - ponto) * passo + passo / 2;
            y = this.margem + 40 + i * 18;
        } 
        // PARTE DE BAIXO
        else {
            let p = ponto - 12;

            x = this.margemEsquerda + p * passo + passo / 2;
            y = height - this.margem - 40 - i * 18;
        }

        return { x, y };
    }

    // DEVOLVE O ÍNDICE DO PONTO CLICADO
    getPontoClicado(x, y) {
        let melhorPonto = -1;
        let menorDistancia = 999999;

        for (let ponto = 0; ponto < 24; ponto++) {
            let p = this.getPosicao(ponto, 0);
            let d = dist(x, y, p.x, p.y);

            if (d < menorDistancia) {
                menorDistancia = d;
                melhorPonto = ponto;
            }
        }

        if (menorDistancia < 80) {
            return melhorPonto;
        }

        return -1;
    }

    // CENTRO DA BARRA PARA O JOGO USAR AO DESENHAR PEÇAS CAPTURADAS
    getCentroBarra() {
        let w = width - this.margemEsquerda - this.margem;
        return this.margemEsquerda + w / 2;
    }
}