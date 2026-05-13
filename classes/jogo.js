class Jogo {
    constructor() {
        // TABULEIRO
        this.tabuleiro = new Tabuleiro();

        // 24 pontos do tabuleiro
        this.pontos = [];

        for (let i = 0; i < 24; i++) {
            this.pontos[i] = [];
        }

        // estado dos dados
        this.dadosLancados = false;
        this.dados = [];

        // cores dos jogadores
        this.corJogador1 = color(245);          // brancas
        this.corJogador2 = color(230, 80, 20); // vermelhas

        // peça selecionada
        this.pecaSelecionada = null;

        this.mensagem = "";

        // turno: 1 = brancas, 2 = vermelhas
        this.turno = 1;

        // direção do movimento
        this.direcao = {
            "branca": -1,
            "preta": 1
        };

        // peças capturadas na barra
        this.barraBrancas = [];
        this.barraPretas = [];

        this.jogadasValidas = [];

        this.foraBrancas = [];
        this.foraPretas = [];

        // criar peças iniciais
        this.criarPecas();

        this.vencedor = "";
    }

    // CRIAR PEÇAS NA POSIÇÃO INICIAL
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

        // VERMELHAS
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
    this.desenharJogadasValidas();
    this.desenharPontos();
    this.desenharUI();
    this.desenharDados();
    this.desenharBarra();
    this.desenharFora();

    if (this.vencedor != "") {
        this.desenharVitoria();
    }
}

    // DESENHAR TODAS AS PEÇAS
    desenharPontos() {
        for (let i = 0; i < 24; i++) {
            let pecaList = this.pontos[i];

            for (let j = 0; j < pecaList.length; j++) {
                let p = this.tabuleiro.getPosicao(i, j);

                push();

                // destacar apenas a peça selecionada
                if (
                    this.pecaSelecionada != null &&
                    this.pecaSelecionada.i == i &&
                    this.pecaSelecionada.j == j
                ) {
                    stroke(0, 255, 0);
                    strokeWeight(4);
                } else {
                    stroke(0);
                    strokeWeight(1);
                }

                pecaList[j].draw(p.x, p.y);

                pop();
            }
        }
    }

    desenharBarra() {
        // brancas capturadas (parte de cima da barra)
        for (let i = 0; i < this.barraBrancas.length; i++) {
            let x = this.tabuleiro.getCentroBarra();
            let y = height - this.tabuleiro.margem - 40 - i * 18;

            push();

            // destacar a peça do topo da barra se for o turno das brancas
            if (this.turno == 1 && i == this.barraBrancas.length - 1) {
                stroke(0, 255, 0);
                strokeWeight(4);
            } else {
                stroke(0);
                strokeWeight(1);
            }

            this.barraBrancas[i].draw(x, y);

            pop();
        }

        // pretas capturadas (parte de baixo da barra)
        for (let i = 0; i < this.barraPretas.length; i++) {
            let x = this.tabuleiro.getCentroBarra();
            let y = this.tabuleiro.margem + 40 + i * 18;

            push();

            // destacar a peça do topo da barra se for o turno das pretas
            if (this.turno == 2 && i == this.barraPretas.length - 1) {
                stroke(0, 255, 0);
                strokeWeight(4);
            } else {
                stroke(0);
                strokeWeight(1);
            }

            this.barraPretas[i].draw(x, y);

            pop();
        }
    }

    desenharJogadasValidas() {
        for (let i = 0; i < this.jogadasValidas.length; i++) {
            let ponto = this.jogadasValidas[i];
            let p = this.tabuleiro.getPosicao(ponto, 0);

            push();
            noFill();
            stroke(0, 200, 0);
            strokeWeight(3);
            ellipse(p.x, p.y, 40, 40);
            pop();
        }
    }

    desenharVitoria() {
    push();

    // overlay escuro transparente
    fill(0, 0, 0, 170);
    noStroke();
    rect(0, 0, width, height);

    // caixa central
    fill(255, 245, 220);
    stroke(120, 70, 20);
    strokeWeight(4);
    rect(width / 2 - 220, height / 2 - 100, 440, 200, 20);

    // texto principal
    noStroke();
    fill(80, 40, 10);
    textAlign(CENTER, CENTER);
    textSize(34);
    text("Fim do jogo", width / 2, height / 2 - 35);

    textSize(24);

    if (this.vencedor == "branca") {
        text("As Brancas venceram!", width / 2, height / 2 + 15);
    } else {
        text("As Vermelhas venceram!", width / 2, height / 2 + 15);
    }

    textSize(14);
    fill(90);
    text("Recarrega a página para jogar novamente", width / 2, height / 2 + 60);

    pop();
}

    // LIDAR COM CLIQUE DO RATO
    mousePressed(x, y) {
        if (this.vencedor != "") {
        return;
        }
        // ---------------------------------------
        // 1. PRIMEIRO CLIQUE DO TURNO = LANÇAR DADOS
        // ---------------------------------------
        if (this.dadosLancados == false) {
            this.lancarDados();
            return;
        }

        // ---------------------------------------
        // 2. SE HOUVER PEÇAS NA BARRA, TÊM DE SER JOGADAS PRIMEIRO
        // ---------------------------------------
        if (this.turno == 1 && this.barraBrancas.length > 0) {
            this.jogarDaBarra("branca", x, y);
            return;
        }

        if (this.turno == 2 && this.barraPretas.length > 0) {
            this.jogarDaBarra("preta", x, y);
            return;
        }

        // ---------------------------------------
        // 3. SE JÁ HÁ UMA PEÇA SELECIONADA
        // ---------------------------------------
        if (this.pecaSelecionada != null) {
            // ---------------------------------------
            // 3.1. VER SE O UTILIZADOR CLICOU NOUTRA PEÇA DO MESMO JOGADOR
            // ---------------------------------------
            for (let i = 0; i < 24; i++) {
                let pecaList = this.pontos[i];

                for (let j = pecaList.length - 1; j >= 0; j--) {
                    let p = this.tabuleiro.getPosicao(i, j);
                    let d = dist(x, y, p.x, p.y);

                    if (d < 20) {
                        let pecaClicada = pecaList[j];

                        // só deixa trocar para peças do jogador atual
                        if (this.turno == 1 && pecaClicada.tipo != "branca") return;
                        if (this.turno == 2 && pecaClicada.tipo != "preta") return;

                        // trocar a seleção para esta nova peça
                        this.pecaSelecionada = { i, j };
                        this.calcularJogadasValidas(i, pecaClicada.tipo);
                        return;
                    }
                }
            }

            // ---------------------------------------
            // 3.2. SE NÃO CLICOU NUMA PEÇA, TENTAR MOVER OU RETIRAR
            // ---------------------------------------
            let origemIndex = this.pecaSelecionada.i;
            let origemLista = this.pontos[origemIndex];
            let peca = origemLista[this.pecaSelecionada.j];

            // ---------------------------------------
            // 3.2.1. TENTAR RETIRAR PEÇA (BEARING OFF)
            // ---------------------------------------
            if (peca.tipo == "branca" && this.todasNoHome("branca")) {
                // retirar clicando fora do tabuleiro à direita
                if (x > width - this.tabuleiro.margem) {
                    let indiceDado = this.getIndiceDadoParaRetirar(origemIndex, "branca");

                    if (indiceDado != -1) {
                        this.retirarPeca(origemIndex, this.pecaSelecionada.j);
                        this.dados.splice(indiceDado, 1);

                        this.pecaSelecionada = null;
                        this.jogadasValidas = [];

                        if (this.foraBrancas.length == 15) {
                            this.vencedor = "branca";
                            return;
                        }

                        if (this.dados.length == 0) {
                            this.passarTurno();
                        } else if (!this.existemJogadasPossiveis()) {
                            this.mensagem = "Sem jogadas possíveis. Passa a vez.";
                            this.passarTurno();
                        }

                        return;
                    }
                }
            }

            if (peca.tipo == "preta" && this.todasNoHome("preta")) {
                // retirar clicando fora do tabuleiro à direita
                if (x > width - this.tabuleiro.margem) {
                    let indiceDado = this.getIndiceDadoParaRetirar(origemIndex, "preta");

                    if (indiceDado != -1) {
                        this.retirarPeca(origemIndex, this.pecaSelecionada.j);
                        this.dados.splice(indiceDado, 1);

                        this.pecaSelecionada = null;
                        this.jogadasValidas = [];

                        if (this.foraPretas.length == 15) {
                            this.vencedor = "preta";
                            return;
                        }

                        if (this.dados.length == 0) {
                            this.passarTurno();
                        } else if (!this.existemJogadasPossiveis()) {
                            this.mensagem = "Sem jogadas possíveis. Passa a vez.";
                            this.passarTurno();
                        }

                        return;
                    }
                }
            }

            // ---------------------------------------
            // 3.2.2. TENTAR MOVER NORMALMENTE
            // ---------------------------------------
            let destinoIndex = this.tabuleiro.getPontoClicado(x, y);

            console.log("Origem:", origemIndex, "Destino:", destinoIndex, "Dados:", this.dados);

            // se clicou fora de uma casa válida, mantém a seleção
            if (destinoIndex == -1) {
                return;
            }

            // se clicou na mesma casa, mantém a seleção
            if (destinoIndex == origemIndex) {
                return;
            }

            let indiceDado = this.getIndiceDadoValido(origemIndex, destinoIndex, peca.tipo);

            console.log("Índice do dado válido:", indiceDado);

            // se não houver dado compatível, mantém a seleção
            if (indiceDado == -1) {
                return;
            }

            // se a casa estiver bloqueada, mantém a seleção
            if (this.casaBloqueada(destinoIndex, peca.tipo)) {
                return;
            }

            // se houver uma peça adversária sozinha, capturar
            this.capturarPeca(destinoIndex, peca.tipo);

            // remover a peça da origem
            origemLista.splice(this.pecaSelecionada.j, 1);

            // colocar a peça no destino
            this.pontos[destinoIndex].push(peca);

            // remover o dado usado
            this.dados.splice(indiceDado, 1);

            // limpar seleção só depois de uma jogada válida
            this.pecaSelecionada = null;
            this.jogadasValidas = [];

            // se já não houver dados, termina o turno
            if (this.dados.length == 0) {
                this.passarTurno();
            } else {
                // se ainda há dados mas já não existem jogadas possíveis, passa também
                if (!this.existemJogadasPossiveis()) {
                    this.mensagem = "Sem jogadas possíveis. Passa a vez.";
                    this.passarTurno();
                }
            }

            return;
        }

        // ---------------------------------------
        // 4. SE NÃO HÁ PEÇA SELECIONADA, TENTAR SELECIONAR UMA
        // ---------------------------------------
        for (let i = 0; i < 24; i++) {
            let pecaList = this.pontos[i];

            for (let j = pecaList.length - 1; j >= 0; j--) {
                let p = this.tabuleiro.getPosicao(i, j);
                let d = dist(x, y, p.x, p.y);

                if (d < 20) {
                    let peca = pecaList[j];

                    // só pode selecionar peças do jogador atual
                    if (this.turno == 1 && peca.tipo != "branca") return;
                    if (this.turno == 2 && peca.tipo != "preta") return;

                    // se tiver peças na barra, não pode selecionar peças do tabuleiro
                    if (this.temPecasNaBarra(peca.tipo)) return;

                    this.pecaSelecionada = { i, j };
                    this.calcularJogadasValidas(i, peca.tipo);
                    return;
                }
            }
        }
    }

    // LANÇAR DADOS
    lancarDados() {
        if (this.dadosLancados) return;

        this.mensagem = "";

        let d1 = int(random(1, 7));
        let d2 = int(random(1, 7));

        // se forem iguais, joga 4 vezes
        if (d1 == d2) {
            this.dados = [d1, d1, d1, d1];
        } else {
            this.dados = [d1, d2];
        }

        this.dadosLancados = true;

        // se não houver jogadas possíveis, passa logo o turno
        if (!this.existemJogadasPossiveis()) {
            this.mensagem = "Sem jogadas possíveis. Passa a vez.";
            this.passarTurno();
        }
    }

    // UI
    desenharUI() {
    push();

    // caixa de fundo da UI
    fill(255, 255, 255, 210);
    stroke(80);
    strokeWeight(2);
    rect(15, 15, 250, 140, 10);

    // título do turno
    noStroke();
    fill(30);
    textAlign(LEFT, BASELINE);
    textSize(18);

    if (this.turno == 1) {
        text("Turno: Brancas", 30, 40);
    } else {
        text("Turno: Vermelhas", 30, 40);
    }

    // estado do jogo
    textSize(14);

    if (this.dadosLancados == false) {
        text("Clique para lançar os dados", 30, 65);
    } else {
        text("Selecione uma peça e mova", 30, 65);
    }

    // peças retiradas
    text("Brancas fora: " + this.foraBrancas.length, 30, 90);
    text("Vermelhas fora: " + this.foraPretas.length, 30, 110);

    // mensagem da barra
    if (this.turno == 1 && this.barraBrancas.length > 0) {
        fill(180, 80, 0);
        text("Brancas: jogar da barra", 30, 135);
    }

    if (this.turno == 2 && this.barraPretas.length > 0) {
        fill(180, 80, 0);
        text("Vermelhas: jogar da barra", 30, 135);
    }

    // mensagem geral
    if (this.mensagem != "") {
        fill(150, 0, 0);
        text(this.mensagem, 30, 135);
    }

    pop();
}

    // DESENHAR DADOS
    desenharDados() {
    push();

    for (let i = 0; i < this.dados.length; i++) {
        let x = 285 + i * 48;
        let y = 25;

        // sombra
        noStroke();
        fill(0, 0, 0, 80);
        rect(x + 3, y + 3, 40, 40, 8);

        // dado
        fill(255);
        stroke(60);
        strokeWeight(2);
        rect(x, y, 40, 40, 8);

        // número
        noStroke();
        fill(20);
        textAlign(CENTER, CENTER);
        textSize(18);
        text(this.dados[i], x + 20, y + 21);
    }

    pop();
}

    // VERIFICA SE O MOVIMENTO ENTRE ORIGEM E DESTINO CORRESPONDE A UM DOS DADOS
    getIndiceDadoValido(origem, destino, tipoPeca) {
        let diferenca;

        // brancas andam para índices mais pequenos
        if (tipoPeca == "branca") {
            diferenca = origem - destino;
        }
        // pretas andam para índices mais grandes
        else {
            diferenca = destino - origem;
        }

        // procurar se essa diferença existe nos dados disponíveis
        for (let i = 0; i < this.dados.length; i++) {
            if (this.dados[i] == diferenca) {
                return i;
            }
        }

        // não encontrou dado compatível
        return -1;
    }

    casaBloqueada(destinoIndex, tipoPeca) {
        let casa = this.pontos[destinoIndex];

        // casa vazia nunca está bloqueada
        if (casa.length == 0) {
            return false;
        }

        let tipoPrimeira = casa[0].tipo;

        // se a casa tem peças do mesmo jogador, não está bloqueada
        if (tipoPrimeira == tipoPeca) {
            return false;
        }

        // se tem 2 ou mais peças adversárias, está bloqueada
        if (casa.length >= 2) {
            return true;
        }

        return false;
    }
    
    capturarPeca(destinoIndex, tipoPeca) {
        let casa = this.pontos[destinoIndex];

        // só captura se houver exatamente 1 peça adversária
        if (casa.length == 1 && casa[0].tipo != tipoPeca) {
            let capturada = casa.pop();

            if (capturada.tipo == "branca") {
                this.barraBrancas.push(capturada);
            } else {
                this.barraPretas.push(capturada);
            }
        }
    }

    temPecasNaBarra(tipoPeca) {
        if (tipoPeca == "branca") {
            return this.barraBrancas.length > 0;
        } else {
            return this.barraPretas.length > 0;
        }
    }

    getDestinoEntrada(tipoPeca, valorDado) {
        // brancas entram no home das pretas (lado direito em cima)
        if (tipoPeca == "branca") {
            return 24 - valorDado;
        }

        // pretas entram no home das brancas (lado direito em baixo)
        return valorDado - 1;
    }

    jogarDaBarra(tipoPeca, x, y) {
        let destinoIndex = this.tabuleiro.getPontoClicado(x, y);

        if (destinoIndex == -1) return;

        for (let i = 0; i < this.dados.length; i++) {
            let valorDado = this.dados[i];
            let destinoCorreto = this.getDestinoEntrada(tipoPeca, valorDado);

            if (destinoIndex == destinoCorreto) {
                if (this.casaBloqueada(destinoIndex, tipoPeca)) {
                    return;
                }

                this.capturarPeca(destinoIndex, tipoPeca);

                let peca;
                if (tipoPeca == "branca") {
                    peca = this.barraBrancas.pop();
                } else {
                    peca = this.barraPretas.pop();
                }

                this.pontos[destinoIndex].push(peca);

                this.dados.splice(i, 1);

                if (this.dados.length == 0) {
                    this.passarTurno();
                } else {
                    if (!this.existemJogadasPossiveis()) {
                        this.mensagem = "Sem jogadas possíveis. Passa a vez.";
                        this.passarTurno();
                    }
                }

                return;
            }
        }
    }

    passarTurno() {
        this.dados = [];
        this.dadosLancados = false;
        this.pecaSelecionada = null;
        this.jogadasValidas = [];

        if (this.turno == 1) {
            this.turno = 2;
        } else {
            this.turno = 1;
        }
    }

    existemJogadasPossiveis() {
        let tipoAtual = (this.turno == 1) ? "branca" : "preta";

        // retirar peças também é uma jogada possível
        if (this.existeRetiradaPossivel(tipoAtual)) {
            return true;
        }

        if (tipoAtual == "branca" && this.barraBrancas.length > 0) {
            return this.existemJogadasDaBarra("branca");
        }

        if (tipoAtual == "preta" && this.barraPretas.length > 0) {
            return this.existemJogadasDaBarra("preta");
        }

        for (let i = 0; i < 24; i++) {
            let casa = this.pontos[i];

            for (let j = 0; j < casa.length; j++) {
                let peca = casa[j];

                if (peca.tipo != tipoAtual) continue;

                for (let d = 0; d < this.dados.length; d++) {
                    let valor = this.dados[d];
                    let destino;

                    if (peca.tipo == "branca") {
                        destino = i - valor;
                    } else {
                        destino = i + valor;
                    }

                    if (destino < 0 || destino > 23) continue;

                    if (!this.casaBloqueada(destino, peca.tipo)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    existeRetiradaPossivel(tipoPeca) {
    if (!this.todasNoHome(tipoPeca)) return false;

    for (let i = 0; i < 24; i++) {
        let casa = this.pontos[i];

        for (let j = 0; j < casa.length; j++) {
            let peca = casa[j];

            if (peca.tipo != tipoPeca) continue;

            let indiceDado = this.getIndiceDadoParaRetirar(i, tipoPeca);

            if (indiceDado != -1) {
                return true;
            }
        }
    }

    return false;
}

    existemJogadasDaBarra(tipoPeca) {
        for (let i = 0; i < this.dados.length; i++) {
            let valor = this.dados[i];
            let destino = this.getDestinoEntrada(tipoPeca, valor);

            if (destino >= 0 && destino <= 23) {
                if (!this.casaBloqueada(destino, tipoPeca)) {
                    return true;
                }
            }
        }

        return false;
    }

    

    calcularJogadasValidas(origemIndex, tipoPeca) {
        this.jogadasValidas = [];

        for (let i = 0; i < this.dados.length; i++) {
            let valor = this.dados[i];
            let destino;

            if (tipoPeca == "branca") {
                destino = origemIndex - valor;
            } else {
                destino = origemIndex + valor;
            }

            if (destino < 0 || destino > 23) continue;

            if (!this.casaBloqueada(destino, tipoPeca)) {
                // evitar duplicados
                if (!this.jogadasValidas.includes(destino)) {
                    this.jogadasValidas.push(destino);
                }
            }
        }
    }

    todasNoHome(tipoPeca) {
        // verificar peças no tabuleiro
        for (let i = 0; i < 24; i++) {
            let casa = this.pontos[i];

            for (let j = 0; j < casa.length; j++) {
                let peca = casa[j];

                if (peca.tipo != tipoPeca) continue;

                // brancas só podem estar de 0 a 5
                if (tipoPeca == "branca" && (i < 0 || i > 5)) {
                    return false;
                }

                // pretas só podem estar de 18 a 23
                if (tipoPeca == "preta" && (i < 18 || i > 23)) {
                    return false;
                }
            }
        }

        // se tiver peças na barra, também não pode retirar
        if (tipoPeca == "branca" && this.barraBrancas.length > 0) return false;
        if (tipoPeca == "preta" && this.barraPretas.length > 0) return false;

        return true;
    }

    retirarPeca(origemIndex, indicePeca) {
        let origemLista = this.pontos[origemIndex];
        let peca = origemLista.splice(indicePeca, 1)[0];

        if (peca.tipo == "branca") {
            this.foraBrancas.push(peca);
        } else {
            this.foraPretas.push(peca);
        }
    }

    getIndiceDadoParaRetirar(origemIndex, tipoPeca) {
        for (let i = 0; i < this.dados.length; i++) {
            let valor = this.dados[i];

            if (tipoPeca == "branca") {
                // branca em 0 retira com 1, em 1 com 2, etc
                if (origemIndex + 1 == valor) {
                    return i;
                }
            } else {
                // preta em 23 retira com 1, em 22 com 2, etc
                if (24 - origemIndex == valor) {
                    return i;
                }
            }
        }

        return -1;
    }

    desenharFora() {
        // brancas retiradas aparecem do lado direito, em cima
        for (let i = 0; i < this.foraBrancas.length; i++) {
            let x = width - 20;
            let y = this.tabuleiro.margem + 20 + i * 8;
            this.foraBrancas[i].draw(x, y);
        }

        // vermelhas retiradas aparecem do lado direito, em baixo
        for (let i = 0; i < this.foraPretas.length; i++) {
            let x = width - 20;
            let y = height - this.tabuleiro.margem - 20 - i * 8;
            this.foraPretas[i].draw(x, y);
        }
    }

}