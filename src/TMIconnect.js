import tmi from 'tmi.js'

export class TMIconnect {
    constructor(MessageHandler) {
        this.client = null;
        this.isConnected = null;
        this.MessageHandler = MessageHandler;
        this.messageListener = null; 
    }

    definirIsConnectedCallback(callback) {
        this.isConnected = callback;
    }

    clientConnect(channelName) {
        this.client = new tmi.Client({
            channels: [ channelName ]
        });
        
        this.client.connect().then(() => {

            if (this.isConnected) this.isConnected();

            this.messageListener = (channel, tags, message) => {
                this.MessageHandler.tratarMensagem(tags['display-name'], message);
            };

            this.client.on('message', this.messageListener);
        });
    }

    clientDisconnect() {
        if (!this.isConnected) throw new Error("O cliente não está conectado.");
        
        this.client.off('message', this.messageListener);
        this.client.disconnect();
        this.isConnected = null;
        this.MessageHandler.mensagens = [];
    }
}
