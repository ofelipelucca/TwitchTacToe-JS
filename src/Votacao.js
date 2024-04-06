import { adicionarVoto, registrarVoto } from "./reducers.js";
import store from "./store.js";

export class Votacao {
    constructor() {

        this.JogadasPossiveis = [
            "!cimaesquerda","!cimameio","!cimadireita",
            "!meioesquerda","!meiomeio","!meiodireita",
            "!baixoesquerda","!baixomeio","!baixodireita",
        ];
    }

    processarVoto(jogador, mensagem) {
    
        const mensagemFiltrada = mensagem.toLowerCase();
        
        const timeJogando = store.getState().game.currentTeam;
        
        if (timeJogando == jogador.Time) {

            for(const jogada of this.JogadasPossiveis) {

                if (mensagemFiltrada == jogada) {

                    this.registrarVoto(jogador, mensagemFiltrada);
                }
            }
        }
    }

    registrarVoto(jogador, voto) {
        
        let indice = -1;
    
        switch (voto) {
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
                return;
        }

        if (store.getState().game.tabuleiroAtual[indice] != '') return;
        
        store.dispatch(adicionarVoto());
    
        const nome = jogador.Nome;

        store.dispatch(registrarVoto({indice, jogador: nome}));
    } 
}