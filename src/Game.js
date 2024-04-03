import store from './store.js';
import { atualizarTabuleiro, endMontagemTimes, endVotacao, limparVotos, limparVotosETabuleiro, setCurrentTeam, setPosicaoMaisVotada, setVencedor, startVotacao } from './reducers.js';

import TutorialComponent from './pages/components/Tutorial.jsx';

export class TicTacToeGame {
    constructor() {
        this.RodadaAtual = 0;
        this.TempoMaximoRodada = 25;
        this.timerRodada = null;

        this.Tabuleiro = [0, 0, 0,
                          0, 0, 0, 
                          0, 0, 0];
    }

    iniciarJogo() {

        store.dispatch(endMontagemTimes());

        store.dispatch(setVencedor(null));

        console.log('Jogo começou');
        
        this.exibirTutorial();

        this.sortearTimeInicial();

        this.iniciarRodada();
    }

    exibirTutorial() {

        const telaTutorial = new TutorialComponent();

        telaTutorial.setState({exibirTutorial: true});
    }

    iniciarRodada() {

        this.RodadaAtual++;

        console.log('Começando a rodada ' + this.RodadaAtual);

        let timeJogando = store.getState().game.currentTeam;
    
        let proximoTime = timeJogando === 'Vermelho' ? 'Azul' : 'Vermelho';

        store.dispatch(setCurrentTeam(proximoTime));

        console.log('Time que vai começar: ' + proximoTime);

        this.iniciarVotacao();
    }

    sortearTimeInicial() {
        
        const timeSorteado = Math.random() < 0.5 ? 'Vermelho' : 'Azul';
        store.dispatch(setCurrentTeam(timeSorteado));
    }

    iniciarVotacao() {

        console.log('Votaçao iniciada.');

        store.dispatch(startVotacao());

        this.timerRodada = setTimeout(() => {

            store.dispatch(endVotacao());

            console.log('Votaçao encerrada');

            clearTimeout(this.timerRodada);
            
            let maiorVotos = 0;
            
            const votos = store.getState().game.tabuleiroVotos;

            const quantidadeVotos = store.getState().game.votosTotais;

            console.log('Votos registrados: ' + quantidadeVotos);

            if (quantidadeVotos > 0) {

                maiorVotos = Math.max(...votos);

                const indicePosicaoMaisVotada = votos.indexOf(maiorVotos);
                
                const posicaoMaisVotada = store.getState().game.jogadasPossiveis[indicePosicaoMaisVotada];

                console.log('Votos:');

                console.log(`[${votos[0]}] [${votos[1]}] [${votos[2]}]`);
                console.log(`[${votos[3]}] [${votos[4]}] [${votos[5]}]`);
                console.log(`[${votos[6]}] [${votos[7]}] [${votos[8]}]`);
                
                store.dispatch(setPosicaoMaisVotada(posicaoMaisVotada));
                
                this.processarJogada(posicaoMaisVotada);
            } else {

                console.log('Não houve votos na rodada.');
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
        
            valor = timeJogando === 'Vermelho' ? 'X' : 'O';
        
            this.Tabuleiro[indice]++;    
            
            store.dispatch(atualizarTabuleiro({indice, valor}));
            
            const tabuleiroStore = store.getState().game.tabuleiroAtual;

            console.log('Tabuleiro atual: ');

            console.log(`[${tabuleiroStore[0]}] [${tabuleiroStore[1]}] [${tabuleiroStore[2]}]`);
            console.log(`[${tabuleiroStore[3]}] [${tabuleiroStore[4]}] [${tabuleiroStore[5]}]`);
            console.log(`[${tabuleiroStore[6]}] [${tabuleiroStore[7]}] [${tabuleiroStore[8]}]`);
        }

        this.finalizarRodada();
    }   

    async finalizarRodada() {

        const timeVencedor = await this.verificarVencedor();

        console.log('Finalizando a rodada.');

        if (timeVencedor == 'Empate') {

            store.dispatch(setVencedor('Empate'));

            console.log(store.getState().game.timeVencedor);

            this.iniciarNovoJogo();

            return;
        } else if (timeVencedor != null) {

            store.dispatch(setVencedor(timeVencedor));
            
            console.log('Time vencedor: ' + store.getState().game.timeVencedor);

            this.iniciarNovoJogo();

            return;
        }

        console.log('Ainda não houve ganhador, iniciando outra rodada.');

        store.dispatch(limparVotos());

        this.iniciarRodada();
    }

    iniciarNovoJogo() {

        store.dispatch(limparVotosETabuleiro());

        store.dispatch(setVencedor(null));

        this.RodadaAtual = 0;

        console.log('Iniciando um novo jogo...');

        this.iniciarRodada();
    }

    verificarVencedor() {

        return new Promise((resolve) => {

            const tabuleiro = store.getState().game.tabuleiroAtual;
    
            console.log('Verificando vencedor.');

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
    
                    console.log('Vencedor em linha!');
    
                    resolve(tabuleiro[i * 3] === 'X' ? 'Vermelho' : 'Azul');
                    return;
                }
            }
        
            // Verificar colunas
            for (let i = 0; i < 3; i++) {
                if (tabuleiro[i] != '' && 
                    (tabuleiro[i] == tabuleiro[i + 3] && tabuleiro[i + 3] == tabuleiro[i + 6])) {
                    console.log('Vencedor em coluna!');
                    resolve(tabuleiro[i] === 'X' ? 'Vermelho' : 'Azul');
                    return;
                }
            }
        
            // Verificar diagonais
            if (tabuleiro[4] != '' && ((tabuleiro[0] == tabuleiro[4] && tabuleiro[4] == tabuleiro[8]) || 
                                       (tabuleiro[2] == tabuleiro[4] && tabuleiro[4] == tabuleiro[6]))) {
                    console.log('Vencedor na diagonal!');
                    resolve(tabuleiro[4] === 'X' ? 'Vermelho' : 'Azul');
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