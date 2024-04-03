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
            <h2>Tutorial do Jogo</h2>
            <p>Aqui vai o conteúdo do tutorial...</p>
            <button onClick={props.fecharTutorial}>Entendi</button> 
        </div>
    );
}

export default TutorialComponent;