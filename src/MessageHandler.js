import { TicTacToePlayers } from "./Teams";
import store from "./store";

export class MessageHandler {
    constructor(instanceMaster) {
        this.InstanceMaster = instanceMaster;
        this.mensagens = [];
        this.limiteMensagens = 30;
    }

    async tratarMensagem(nome, mensagem) {

        this.exibirMensagem(nome, mensagem);

        mensagem = mensagem.toLowerCase();

        if (store.getState().game.votacaoAcontecendo) {
            const voto = await this.processarVoto(nome, mensagem);

            this.InstanceMaster.Votacao.registrarVoto(voto);
        }

        if (store.getState().game.montandoTimes) this.montarTimes(nome, mensagem);
    }

    exibirMensagem(nome, mensagem) {

        let divChatContainer = document.querySelector('.chatContainer');

        let novaMensagem = document.createElement('div');

        novaMensagem.classList.add('Mensagem');

        novaMensagem.innerHTML = `(${nome}): ${mensagem}`;

        divChatContainer.appendChild(novaMensagem);

        divChatContainer.scrollTop = divChatContainer.scrollHeight;

        this.mensagens.push(novaMensagem);

        if (this.mensagens.length > this.limiteMensagens) {
            divChatContainer.removeChild(this.mensagens.shift());
        }
    }

    processarVoto(nome, mensagem) {

        return new Promise((resolve) => {
    
            const mensagemFiltrada = mensagem.toLowerCase();
    
            const jogador = this.InstanceMaster.Teams.searchJogador(nome);
            
            const timeJogando = store.getState().game.currentTeam.toLowerCase();
    
            const jogadasPossiveis = this.InstanceMaster.getJogadasPossiveis();
            
            if (timeJogando == jogador.Time) {
    
                for(const jogada of jogadasPossiveis) {
    
                    if (mensagemFiltrada == jogada) {
    
                        resolve(mensagemFiltrada);
                        return;
                    }
                }
            }
        });
    }

    montarTimes(nome, mensagem) {

        if (mensagem == "!timeazul") {

            const jogador = new TicTacToePlayers(nome, "azul");

            this.InstanceMaster.Teams.adicionarJogador(jogador);

            console.log('Entrou no time azul: ' + nome);

            return;
        }   
        
        if (mensagem == "!timevermelho") {

            const jogador = new TicTacToePlayers(nome, "vermelho");

            this.InstanceMaster.Teams.adicionarJogador(jogador);

            console.log('Entrou no time vermelho: ' + nome);

            return;
        }

        throw new Error("Não foi possível criar um novo Jogador ");
    }
}