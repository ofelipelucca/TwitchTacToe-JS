import React, { Component } from 'react';

export class TutorialComponent extends Component {
    constructor() {
        super();
        this.state = {
            exibirTutorial: true
        };
        this.fecharTutorial = this.fecharTutorial.bind(this); 
    }

    fecharTutorial() {
        this.setState({ exibirTutorial: false });
    }

    render() {
        return (
            <div>
                {this.state.exibirTutorial && <Tutorial fecharTutorial={this.fecharTutorial} />} 
            </div>
        );
    }
}

function Tutorial(props) { 
    return (
        <div>
            <div className='container-tutorial'>
                <h2>COMO JOGAR?</h2>
                <p>1. AS RODADAS TÊM 25 SEGUNDOS, ONDE O TIME DA VEZ VOTA (PELO CHAT) QUAL JOGADA FAZER.</p>
                <p>2. A TODO MOMENTO FICARÁ VISÍVEL NA TELA OS COMANDOS PARA AS JOGADAS POSSÍVEIS, BASTA ENVIÁ-LOS NA VEZ DO SEU TIME.</p>
                <p>3. A JOGADA MAIS VOTADA PELO TIME SERÁ EXECUTADA.</p>
                <button onClick={props.fecharTutorial}>ENTENDI!</button>
            </div> 
        </div>
    );
}

export default TutorialComponent;