import { createSlice } from "../node_modules/@reduxjs/toolkit/dist/index";

const initialState = {
    gameStarted: false,
    votacaoAcontecendo: false,
    montandoTimes: false,
    currentTeam: null,
    posicaoMaisVotada: null,
    tabuleiroAtual: ['','','',
                     '','','',
                     '','','',],

    tabuleiroVotos: [0,0,0,
                     0,0,0,
                     0,0,0],

    votosTotais: 0,
    timeVencedor: null,
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
        startMontagemTimes: state => {
            state.montandoTimes = true;
        },
        endMontagemTimes: state => {
            state.montandoTimes = false;
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
            const indice  = action.payload;
            state.tabuleiroVotos[indice]++;
        },
        adicionarVoto: (state) => {
            state.votosTotais++;
        },
        setVencedor: (state, action) => {
            state.timeVencedor = action.payload;
        },
        limparVotosETabuleiro: state => {
            state.tabuleiroAtual = ['','','','','','','','','',];
            state.tabuleiroVotos = [0,0,0,0,0,0,0,0,0];
            state.votosTotais = 0;
        },
        limparVotos: state => {
            state.tabuleiroVotos = [0,0,0,0,0,0,0,0,0];
            state.votosTotais = 0;
        }
    }
});

export const {
    startGame,
    endGame,
    startVotacao,
    endVotacao,
    startMontagemTimes,
    endMontagemTimes,
    setCurrentTeam,
    setPosicaoMaisVotada,
    atualizarTabuleiro,
    registrarVoto,
    adicionarVoto,
    setVencedor,
    limparVotosETabuleiro,
    limparVotos
} = gameSlice.actions;

export default gameSlice.reducer;