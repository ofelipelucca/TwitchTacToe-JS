export class TicTacToeTeams {
    constructor() {
        this.timeVermelho = [];
        this.timeAzul = [];
    }

    adicionarJogador(jogador) {
        if (jogador instanceof TicTacToePlayers) {
            if (jogador.Time === "vermelho") {
                this.timeVermelho.push(jogador);
            } else if (jogador.Time === "azul") {
                this.timeAzul.push(jogador);
            } else {
                throw new Error("Não foi possível verificar o time do jogador " + jogador, ".");
            }
        } else {
            throw new Error("Entrada inválida: O método 'adicionarJogador' deve receber um objeto de 'TicTacToePlayers'.");
        }
    }

    searchJogador(nome) {
    
        for (const jogador of this.timeVermelho) {
            if (jogador.Nome === nome) {
                return jogador;
            }
        }
    
        for (const jogador of this.timeAzul) {
            if (jogador.Nome === nome) {
                return jogador;
            }
        }

        return null;
    }
    

    getAllTeams() {
        return [...this.timeVermelho, ...this.timeAzul];
    }

    getTimeAzul() {
        return this.timeAzul;
    }

    getTimeVermelho() {
        return this.timeVermelho;
    }
}

export class TicTacToePlayers {
    constructor(nome, time) {
        if (nome === '') throw new Error("Entrada inválida: O campo 'Nome' está vazio.");

        this.Nome = nome.toLowerCase();

        time.toLowerCase();
        
        if (time === "azul") this.Time = time;
        else if (time === "vermelho") this.Time = time
        else throw new Error("Entrada inválida: O campo 'Time' está incorreto, use 'Vermelho' ou 'Azul'.");
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
