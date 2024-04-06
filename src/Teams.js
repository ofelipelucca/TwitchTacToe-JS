import { adicionarJogador } from "./reducers";
import store from "./store";

export class TicTacToeTeams {
    
    async montarTimes(nome, time) {
        const jogadorExistente = await this.searchJogador(nome);
        
        if (jogadorExistente != null) return;

        const jogador = new TicTacToePlayers(nome, time);

        this.criarJogador(jogador);
    }

    criarJogador(jogador) {

        if (jogador instanceof TicTacToePlayers) {

            const time = jogador.Time;

            const jogadorJSONData = jogador.toJson();

            if (time === "vermelho") {
                store.dispatch(adicionarJogador(jogadorJSONData));
            } else if (time === "azul") {
                store.dispatch(adicionarJogador(jogadorJSONData));    
            } else {
                throw new Error("Não foi possível verificar a entrada do time do jogador " + jogador + ".");
            }
        } else {
            throw new Error("Entrada inválida: O método 'adicionarJogador' deve receber um objeto de 'TicTacToePlayers'.");
        }
    }

    async searchJogador(nome) {
        const allTeams = this.getAllTeams();

        for (const jogador of allTeams) {
            if (jogador.Nome === nome) {
                return jogador;
            }
        }

        return null;
    }
    
    getAllTeams() {
        return [...store.getState().game.timeVermelho, ...store.getState().game.timeAzul];
    }

    getTimeAzul() {
        return store.getState().game.timeAzul;
    }

    getTimeVermelho() {
        return store.getState().game.timeVermelho;
    }
}

export class TicTacToePlayers {
    constructor(nome, time) {

        if (nome === '') throw new Error("Entrada inválida: O campo 'Nome' está vazio.");

        this.Nome = nome.toLowerCase();

        time.toLowerCase();
        
        if (time === "azul") this.Time = time;
        else if (time === "vermelho") this.Time = time;
        else throw new Error("Entrada inválida: O campo 'Time' está incorreto, use 'Vermelho' ou 'Azul'.");

        this.Votos = 0;
    }

    toJson() {
        return {
            Nome: this.Nome,
            Time: this.Time,
            Votos: this.Votos
        };
    }

    getPlayer() {
        return this;
    }

    getPlayerNome() {
        return this.Nome;
    }

    getPlayerTime() {
        return this.Time;
    }
}