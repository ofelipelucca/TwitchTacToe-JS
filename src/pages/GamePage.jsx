import '../styles/Site.css'
import '../styles/Game.css'

import React from 'react'
import { useSelector } from 'react-redux'

import Timer from './components/Timer'
import TicTacToeImage from '../assets/Tic-tac-toe.png'
import OImage from '../assets/O.png'
import XImage from '../assets/X.png'

import TutorialComponent from './components/Tutorial.jsx'

function GamePage() {

    const tabuleiroAtual = useSelector(state => state.game.tabuleiroAtual);
    const rodadaAtual = useSelector(state => state.game.rodadaAtual);
    const timeJogando = useSelector(state => state.game.currentTeam).toUpperCase();

    return (
        <div className="container">
            
            <TutorialComponent />

            <div className="chatContainer"></div>
            <div className="container-game">

                
                <div className="container-rodada-info">
                    <div id='container-timer'>
                        <Timer />
                    </div>
                    <div id='container-rodada'>
                        <h2 id='qual-rodada'>RODADA</h2><span id='rodada-count'>{rodadaAtual}</span>
                    </div>
                </div>

                <img id='img-tictactoe' src={ TicTacToeImage } alt="Tic Tac Toe Draw" />

                <div className="Linha" id='LinhaUm'>
                        <div className="Elemento" id="LinhaUmEsquerda">{tabuleiroAtual[0] !== '' ? (tabuleiroAtual[0] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!cimaesquerda"}</div>
                        <div className="Elemento" id="LinhaUmMeio">{tabuleiroAtual[1] !== '' ? (tabuleiroAtual[1] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!cimameio"}</div>
                        <div className="Elemento" id="LinhaUmDireita">{tabuleiroAtual[2] !== '' ? (tabuleiroAtual[2] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!cimadireita"}</div>
                    </div>
                    <div className="Linha" id='LinhaDois'>
                        <div className="Elemento" id="LinhaDoisEsquerda">{tabuleiroAtual[3] !== '' ? (tabuleiroAtual[3] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!meioesquerda"}</div>
                        <div className="Elemento" id="LinhaDoisMeio">{tabuleiroAtual[4] !== '' ? (tabuleiroAtual[4] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!meiomeio"}</div>
                        <div className="Elemento" id="LinhaDoisDireita">{tabuleiroAtual[5] !== '' ? (tabuleiroAtual[5] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!meiodireita"}</div>
                    </div>
                    <div className="Linha" id='LinhaTres'>
                        <div className="Elemento" id="LinhaTresEsquerda">{tabuleiroAtual[6] !== '' ? (tabuleiroAtual[6] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!baixoesquerda"}</div>
                        <div className="Elemento" id="LinhaTresMeio">{tabuleiroAtual[7] !== '' ? (tabuleiroAtual[7] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!baixomeio"}</div>
                        <div className="Elemento" id="LinhaTresDireita">{tabuleiroAtual[8] !== '' ? (tabuleiroAtual[8] === 'X' ? <img id='img-played-x' src={XImage} alt="X" /> : <img id='img-played-o' src={OImage} alt="O" />) : "!baixodireita"}</div>
                    </div>

                    <div className="container-rodape">
                        <h2>VEZ DO TIME:</h2><span className='span-time-rodada' id={timeJogando == 'VERMELHO' ? 'span-time-vermelho' : 'span-time-azul'}>{timeJogando}</span>
                    </div>
                </div>
            </div>
    )
}

export default GamePage;