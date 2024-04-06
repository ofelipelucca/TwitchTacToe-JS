import store from "./store.js";

export class MessageHandler {
    constructor(instanceMaster) {
        this.InstanceMaster = instanceMaster;
        this.mensagens = [];
        this.limiteMensagens = 30;
    }

    async tratarMensagem(nome, mensagem) {

        this.exibirMensagem(nome, mensagem);

        mensagem = mensagem.toLowerCase();
        
        const jogador = await this.InstanceMaster.Teams.searchJogador(nome);

        
        if (store.getState().game.votacaoAcontecendo && mensagem.startsWith('!') && jogador != null) {

            this.InstanceMaster.Votacao.processarVoto(jogador, mensagem);
        }

        if (store.getState().game.montandoTimes && mensagem.startsWith('!')) {

            if (mensagem == '!timevermelho') this.InstanceMaster.Teams.montarTimes(nome, 'vermelho');

            if (mensagem == '!timeazul') this.InstanceMaster.Teams.montarTimes(nome, 'azul');
        }
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
}