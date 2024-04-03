import { Votacao } from "./Votacao.js"
import { TicTacToeTeams } from "./Teams.js"

export class InstanceMaster {
    constructor() {
        this.Votacao = new Votacao();
        this.Teams = new TicTacToeTeams();
    }

    getJogadasPossiveis() {
        return this.Votacao.JogadasPossiveis;
    }
}