import '../styles/Site.css'
import '../styles/Game.css'

import React, { useState } from 'react'

import TicTacToeImage from '../assets/Tic-tac-toe.png'
import OIMage from '../assets/O.png'
import XImage from '../assets/X.png'

function GamePage() {

    return (
        <div className="container">

            <div className="chatContainer"></div>
            <div id='container-game'>
                
                <div className="container-rodada-info">
                    <div id='container-timer'>
                        <h2 id="votacao-timer">TEMPO DE VOTAÇÃO:</h2><span id="rodada-timer">0</span><h2 id='votacao-timer'>segundos restantes.</h2>
                    </div>
                    <div id='container-rodada'>
                        <h2 id='qual-rodada'>RODADA</h2><span id='rodada-count'>0</span>
                    </div>
                </div>

                <img id='img-tictactoe' src={ TicTacToeImage } alt="Tic Tac Toe Draw" />

                <div className="TicTacToe">
                    <div className="Linha" id='LinhaUm'>
                        <div className="Elemento" id="LinhaUmEsquerda">!cimaesquerda</div>
                        <div className="Elemento" id="LinhaUmMeio">!cimameio</div>
                        <div className="Elemento" id="LinhaUmDireita">!cimadireita</div>
                    </div>
                    <div className="Linha" id='LinhaDois'>
                        <div className="Elemento" id="LinhaDoisEsquerda">!meioesquerda</div>
                        <div className="Elemento" id="LinhaDoisMeio">!meiomeio</div>
                        <div className="Elemento" id="LinhaDoisDireita">!meiodireita</div>
                    </div>
                    <div className="Linha" id='LinhaTres'>
                        <div className="Elemento" id="LinhaTresEsquerda">!baixoesquerda</div>
                        <div className="Elemento" id="LinhaTresMeio">!baixomeio</div>
                        <div className="Elemento" id="LinhaTresDireita">!baixodireita</div>
                    </div>

                </div>

                <div className="container-rodape">
                    <h2>VEZ DO TIME:</h2><span className='span-time-rodada'></span>
                </div>
            </div>
        </div>
    )
}

export default GamePage;