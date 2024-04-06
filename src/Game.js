import store from './store.js';
import { atualizarTabuleiro, endMontagemTimes, endVotacao, novaRodada, limparVotos, limparVotosETabuleiro, setCurrentTeam, setPosicaoMaisVotada, setVencedor, adicionarVitoria, startVotacao, endGame } from './reducers.js';

export class TicTacToeGame {
    constructor() {
        this.TempoMaximoRodada = store.getState().game.tempoMaximoRodada;
        this.timerRodada = null;
        this.onGameEnd = null;

        this.Tabuleiro = [0, 0, 0,
                          0, 0, 0, 
                          0, 0, 0];
    }

    definirOnGameEnd(callback) {
        this.onGameEnd = callback;
    }
 
    iniciarJogo() {

        store.dispatch(endMontagemTimes());

        store.dispatch(setVencedor(null));
    
        this.sortearTimeInicial();

        this.iniciarRodada();
    }

    iniciarRodada() {

        store.dispatch(novaRodada());

        let timeJogando = store.getState().game.currentTeam;
    
        let proximoTime = timeJogando === 'vermelho' ? 'azul' : 'vermelho';

        store.dispatch(setCurrentTeam(proximoTime));

        this.iniciarVotacao();
    }

    sortearTimeInicial() {
        
        const timeSorteado = Math.random() < 0.5 ? 'vermelho' : 'azul';
        store.dispatch(setCurrentTeam(timeSorteado));
    }

    iniciarVotacao() {

        store.dispatch(startVotacao());

        this.timerRodada = setTimeout(() => {

            store.dispatch(endVotacao());

            clearTimeout(this.timerRodada);
            
            let maiorVotos = 0;
            
            const votos = store.getState().game.tabuleiroVotos;

            const quantidadeVotos = store.getState().game.votosRodada;

            if (quantidadeVotos > 0) {

                maiorVotos = Math.max(...votos);

                const indicePosicaoMaisVotada = votos.indexOf(maiorVotos);
                
                const posicaoMaisVotada = store.getState().game.jogadasPossiveis[indicePosicaoMaisVotada];
                
                store.dispatch(setPosicaoMaisVotada(posicaoMaisVotada));
                
                this.processarJogada(posicaoMaisVotada);
            } else {
                this.iniciarRodada();
            }
                        
        }, this.TempoMaximoRodada * 1000);
    }

    processarJogada(posicaoMaisVotada) {

        if (posicaoMaisVotada) {
                
            const timeJogando = store.getState().game.currentTeam;
            let indice = -1;
            let valor = '';
        
            switch (posicaoMaisVotada) {
                case '!cimaesquerda':
                    indice = 0;
                    break;
                case '!cimameio':
                    indice = 1;
                    break;
                case '!cimadireita':
                    indice = 2;
                    break;
                case '!meioesquerda':
                    indice = 3;
                    break;
                case '!meiomeio':
                    indice = 4;
                    break;
                case '!meiodireita':
                    indice = 5;
                    break;
                case '!baixoesquerda':
                    indice = 6;
                    break;
                case '!baixomeio':
                    indice = 7;
                    break;
                case '!baixodireita':
                    indice = 8;
                    break;
                default:
                    throw new Error("Não foi possível processar o voto no tabuleiro: " + posicaoMaisVotada);
            }
        
            valor = timeJogando === 'vermelho' ? 'X' : 'O';
        
            this.Tabuleiro[indice]++;    
            
            store.dispatch(atualizarTabuleiro({indice, valor}));
        }

        this.finalizarRodada();
    }   

    async finalizarRodada() {

        const timeVencedor = await this.verificarVencedor();

        if (timeVencedor != null) {

            store.dispatch(endGame());

            store.dispatch(setVencedor(timeVencedor));

            store.dispatch(adicionarVitoria(timeVencedor));

            store.dispatch(limparVotosETabuleiro());

            this.finalizarJogo();

            return;
        }

        store.dispatch(limparVotos());

        this.iniciarRodada();
    }

    finalizarJogo() {

        if (this.onGameEnd) {
            this.onGameEnd();
        } else {
            throw new Error("Nenhum callback onGameEnd definido.");
        }
    }

    verificarVencedor() {

        return new Promise((resolve) => {

            const tabuleiro = store.getState().game.tabuleiroAtual;

            // Verificar empate
            let existemVazios = false;
            tabuleiro.forEach(posicao => {
                if (posicao == '') {
                    existemVazios = true;
                    return;
                }
            });

            if (!existemVazios) resolve('Empate');
    
            // Verificar linhas
            for (let i = 0; i < 3; i++) {
                if (tabuleiro[i * 3] != '' && 
                    (tabuleiro[i * 3] == tabuleiro[i * 3 + 1] && tabuleiro[i * 3 + 1] == tabuleiro[i * 3 + 2])) {
    
                    resolve(tabuleiro[i * 3] === 'X' ? 'vermelho' : 'azul');
                    return;
                }
            }
        
            // Verificar colunas
            for (let i = 0; i < 3; i++) {
                if (tabuleiro[i] != '' && 
                    (tabuleiro[i] == tabuleiro[i + 3] && tabuleiro[i + 3] == tabuleiro[i + 6])) {
                    resolve(tabuleiro[i] === 'X' ? 'vermelho' : 'azul');
                    return;
                }
            }
        
            // Verificar diagonais
            if (tabuleiro[4] != '' && ((tabuleiro[0] == tabuleiro[4] && tabuleiro[4] == tabuleiro[8]) || 
                                       (tabuleiro[2] == tabuleiro[4] && tabuleiro[4] == tabuleiro[6]))) {
                    resolve(tabuleiro[4] === 'X' ? 'vermelho' : 'azul');
                    return;
            }
    
            resolve(null);
        });
    } 
}

/* 
    1. quando conectar ao canal, começar a receber comandos para entrar no time desejado (!timevermelho, !timeazul)

        1.1 receber os comandos da classe Message Handler, e armazenar o nome dos jogadores de cada time no vetor do time.

        1.2 exibir na tela: 
            o ultimo jogador a entrar no time
            qunatos jogadores estão em cada time

    2. quando o streamer clicar em Jogar, ir pra tela do jogo e iniciar jogo

        2.1 exibir na tela:
            tutorial de como funciona o jogo, com confirmação de entendi

        2.2 sortear o time que vai começar jogando
            fazer o sorteio apenas no primeiro jogo, e seguir alternando o time que começa

        2.3 iniciar uma votação de 25 segundos para o time da rodada

        2.4 exibir na tela:
            o time que está jogando no momento
            os comandos possíveis para o chat jogar em cada quadrado
            quantos votos cada quadrado possui no momento
            contador de 25 segundos para a votação ser encerrada

        2.5 após encerrar a votação, indicar na tela qual jogada o time decidiu fazer

        2.6 verificar as posições afim de averiguar se algum time venceu
            caso houve vencedor, encerrar jogo
            caso NAO houve vencedor
                em 9 rodadas, encerrar jogo
                e ainda NAO aconteceram 9 rodadas, continuar jogo

    3. quando o jogo acabar, anunciar o vencedor e ir pra tela de Conectado para começar outro jogo
*/