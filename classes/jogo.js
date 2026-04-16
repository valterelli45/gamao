class Jogo {
    constructor() {
        // TABULEIRO
        this.tabuleiro = new Tabuleiro();
        // PEÇAS (estado fake do jogo)
        // 24 pontos do gamão
        this.pontos = [];
        this.dadosLancados = false;

        for (let i = 0; i < 24; i++) {
            this.pontos[i] = [];
        }

        // Jogadores (cores simples)
        this.corJogador1 = color(245);
        this.corJogador2 = color(230, 80, 20);
        // estado de seleção (interação fake)
        this.pecaSelecionada = null;
        // dados fake
        this.dado1 = 1;
        this.dado2 = 1;
        // turno
        this.turno = 1;
        // criar peças iniciais (simplificado)
        this.criarPecas();
    }

    criarPecas() {

        // BRANCAS
        for (let i = 0; i < 2; i++) {
            this.pontos[23].push(new Peca("branca", this.corJogador1));
        }

        for (let i = 0; i < 5; i++) {
            this.pontos[12].push(new Peca("branca", this.corJogador1));
        }

        for (let i = 0; i < 3; i++) {
            this.pontos[7].push(new Peca("branca", this.corJogador1));
        }

        for (let i = 0; i < 5; i++) {
            this.pontos[5].push(new Peca("branca", this.corJogador1));
        }

        // VERMELHAS (espelho correto)
        for (let i = 0; i < 2; i++) {
            this.pontos[0].push(new Peca("preta", this.corJogador2));
        }

        for (let i = 0; i < 5; i++) {
            this.pontos[11].push(new Peca("preta", this.corJogador2));
        }

        for (let i = 0; i < 3; i++) {
            this.pontos[16].push(new Peca("preta", this.corJogador2));
        }

        for (let i = 0; i < 5; i++) {
            this.pontos[18].push(new Peca("preta", this.corJogador2));
        }
    }

    // DESENHO PRINCIPAL
    draw() {
        this.tabuleiro.draw();
        this.desenharPontos();
        this.desenharUI();
        this.desenharDados();
    }

    // DESENHAR PEÇAS
    desenharPontos() {
        for (let i = 0; i < 24; i++) {
            let pecaList = this.pontos[i];

            for (let j = 0; j < pecaList.length; j++) {
                let p = this.tabuleiro.getPosicao(i, j);
                pecaList[j].draw(p.x, p.y);
            }
        }
    }

    // INTERAÇÃO (CLIQUE FAKE)
    mousePressed(x, y) {
        // se ainda não lançou dados, não pode mexer peças
        if (this.dadosLancados == false) {
            this.lancarDados();
            return;
        }
        // tentar selecionar peça
        for (let i = 0; i < 24; i++) {
            let pecaList = this.pontos[i];

            for (let j = 0; j < pecaList.length; j++) {
                let p = this.tabuleiro.getPosicao(i, j);
                let d = dist(x, y, p.x, p.y);

                if (d < 20) {
                    this.pecaSelecionada = { i, j };
                    return;
                }
            }
        }

        // mover peça (fake, sem regras)
        if (this.pecaSelecionada != null) {
            let origem = this.pontos[this.pecaSelecionada.i];
            let peca = origem.splice(this.pecaSelecionada.j, 1)[0];
            // move para ponto clicado (simplificado)
            let destino = int(random(0, 24));
            this.pontos[destino].push(peca);
            this.pecaSelecionada = null;
        }
    }

    // DADOS (FAKE)
    lancarDados() {
        // só permite lançar uma vez
        if (this.dadosLancados == true) return;
        this.dado1 = int(random(1, 7));
        this.dado2 = int(random(1, 7));
        this.dadosLancados = true;
    }

    // UI
    desenharUI() {
        fill(0);
        textSize(16);
        text("Turno: Jogador " + this.turno, 20, 20);
        
        if (this.dadosLancados == false) {
            text("Clique para lançar dados", 20, 40);
        } else {
            text("Dados lançados", 20, 40);
        }
    }

    // DESENHAR DADOS
    desenharDados() {
        fill(255);
        rect(20, 40, 40, 40);
        rect(70, 40, 40, 40);
        fill(0);
        text(this.dado1, 35, 65);
        text(this.dado2, 85, 65);
    }
}