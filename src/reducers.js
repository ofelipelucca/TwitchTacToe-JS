import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameStarted: false,
    votacaoAcontecendo: false,
    rodadaAtual: 0,
    rodadaTotal: 0,
    tempoMaximoRodada: 25,
    montandoTimes: false,
    timeVermelho: [],
    timeAzul: [],
    currentTeam: null,
    timeVencedor: null,
    vitoriasVermelho: 0,
    vitoriasAzul: 0,
    tabuleiroAtual: ['','','',
                     '','','',
                     '','','',],
    tabuleiroVotos: [0,0,0,
                     0,0,0,
                     0,0,0],
    posicaoMaisVotada: null,
    votosTotais: 0,
    votosRodada: 0,
    jogadorMaisVotou: { nome: '', qntVotos: 0 },
    jogadasPossiveis: [
        "!cimaesquerda","!cimameio","!cimadireita",
        "!meioesquerda","!meiomeio","!meiodireita",
        "!baixoesquerda","!baixomeio","!baixodireita",
    ]
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        startGame: state => {
            state.gameStarted = true;
            state.rodadaAtual = 0;
            state.votosTotais = 0;
        },
        endGame: state => {
            state.gameStarted = false;
        },
        startVotacao: state => {
            state.votacaoAcontecendo = true;
        },
        endVotacao: state => {
            state.votacaoAcontecendo = false;
        },
        novaRodada: state => {
            state.rodadaAtual++;
            state.rodadaTotal++;
        },
        startMontagemTimes: state => {
            state.montandoTimes = true;
        },
        endMontagemTimes: state => {
            state.montandoTimes = false;
        },
        adicionarJogador: (state, action) => {
            const jogador = action.payload;

            if (jogador.Time == 'vermelho') state.timeVermelho.push(jogador);
            if (jogador.Time == 'azul') state.timeAzul.push(jogador);
        },
        limparTimes: state => {
            state.timeAzul = [];
            state.timeVermelho = [];
        },
        setCurrentTeam: (state, action) => {
            state.currentTeam = action.payload;
        },
        setPosicaoMaisVotada: (state, action) => {
            state.posicaoMaisVotada = action.payload;
        },
        atualizarTabuleiro: (state, action) => {
            const { indice, valor } = action.payload;
            state.tabuleiroAtual[indice] = valor;
        },
        registrarVoto: (state, action) => {
            const { indice, jogador } = action.payload;
            state.tabuleiroVotos[indice]++;
            state.votosTotais++;
            
            const jogadorVotando = state.currentTeam == 'vermelho' ? state.timeVermelho.find(jogadorVermelho => jogadorVermelho.Nome == jogador) : state.timeAzul.find(jogadorAzul => jogadorAzul.Nome == jogador);
            
            if (jogadorVotando) {
                jogadorVotando.Votos++;
            }
        },
        adicionarVoto: (state) => {
            state.votosRodada++;
        },
        setVencedor: (state, action) => {
            state.timeVencedor = action.payload;
        },
        adicionarVitoria: (state, action) => {
            action.payload == 'vermelho' ? state.vitoriasVermelho++ : state.vitoriasAzul++;
        },
        limparVotosETabuleiro: state => {
            state.tabuleiroAtual = ['','','','','','','','','',];
            state.tabuleiroVotos = [0,0,0,0,0,0,0,0,0];
            state.votosRodada = 0;
        },
        limparVotos: state => {
            state.tabuleiroVotos = [0,0,0,0,0,0,0,0,0];
            state.votosRodada = 0;
        },
        setJogadorMaisVotou: state => {
            let jogadorMaisVotou = { nome: '', qntVotos: 0 };
        
            state.timeAzul.forEach(jogador => {
                if (jogador.Votos > jogadorMaisVotou.qntVotos) {
                    jogadorMaisVotou.nome = jogador.Nome;
                    jogadorMaisVotou.qntVotos = jogador.Votos;
                }
            });
        
            state.timeVermelho.forEach(jogador => {
                if (jogador.Votos > jogadorMaisVotou.qntVotos) {
                    jogadorMaisVotou.nome = jogador.Nome;
                    jogadorMaisVotou.qntVotos = jogador.Votos;
                }
            });
        
            state.jogadorMaisVotou.nome = jogadorMaisVotou.nome;
            state.jogadorMaisVotou.qntVotos = jogadorMaisVotou.qntVotos;
        }  
    }
});

export const {
    startGame,
    endGame,
    startVotacao,
    endVotacao,
    novaRodada,
    startMontagemTimes,
    endMontagemTimes,
    adicionarJogador,
    limparTimes,
    setCurrentTeam,
    setPosicaoMaisVotada,
    atualizarTabuleiro,
    registrarVoto,
    adicionarVoto,
    setVencedor,
    adicionarVitoria,
    limparVotosETabuleiro,
    limparVotos,
    setJogadorMaisVotou
} = gameSlice.actions;

export default gameSlice.reducer;