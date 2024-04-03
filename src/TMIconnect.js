import tmi from 'tmi.js'

export class TMIconnect {
    constructor(MessageHandler) {
        this.client = null;
        this.isConnected = false;
        this.MessageHandler = MessageHandler;
        this.messageListener = null; 
    }

    clientConnect(channelName) {
        this.client = new tmi.Client({
            channels: [ channelName ]
        });
        
        this.client.connect().then(() => {
            console.log('Conectado a ' + channelName);

            this.messageListener = (channel, tags, message) => {
                this.MessageHandler.tratarMensagem(tags['display-name'], message);
            };

            this.client.on('message', this.messageListener);
            this.isConnected = true;
        });
    }

    clientDisconnect() {
        if (!this.isConnected) throw new Error("O cliente não está conectado.");
        
        console.log('Desconectando...');
        
        this.client.off('message', this.messageListener);
        this.client.disconnect();
        this.isConnected = false;
        this.MessageHandler.mensagens = [];
    }
}
