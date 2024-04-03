import { Votacao } from "./Votacao"
import { TicTacToeTeams } from "./Teams"

export class InstanceMaster {
    constructor() {
        this.Votacao = new Votacao();
        this.Teams = new TicTacToeTeams();
    }

    getJogadasPossiveis() {
        return this.Votacao.JogadasPossiveis;
    }
}