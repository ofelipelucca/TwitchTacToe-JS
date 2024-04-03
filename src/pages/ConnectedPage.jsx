import '../styles/Site.css'
import '../styles/Connected.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { TicTacToeGame } from '../Game'
import { startGame } from '../reducers'
import { startMontagemTimes } from '../reducers'

function ConnectedPage() {
    
    const dispatch = useDispatch();

    dispatch(startMontagemTimes());
    
    function iniciarJogo() {


        dispatch(startGame());

        const Game = new TicTacToeGame();

        Game.iniciarJogo();

    }


    return (
        <div className="container">

            <div className="chatContainer"></div>
            <div id='container-connected'>
                <div className="instructions">
                    <h2 id='instructions-h2'>ENTRE NO SEU TIME!</h2>

                    <span id='instructions-texto'>
                    <h3 id='instructions-h3'>ENVIE NO CHAT:</h3>
                    <div id='instructions-comandos'>
                        <div id='instructions-vermelho'>
                            <p id='vermelho'>'!TIMEVERMELHO'</p><p>PARA JOGAR COMO</p><p style={{color: 'red'}}>'X'</p><p>!</p>
                        </div>
                        <p>OU</p>    
                        <div id='instructions-azul'>
                            <p id='azul'>'!TIMEAZUL'</p><p>PARA JOGAR COMO</p><p style={{color: 'blue'}}>'O'</p><p>!</p>
                        </div>
                    </div>
                    </span>

                    <div className="gameControls">
        
                        <Link to="game">
                            <button className="startButton" onClick={iniciarJogo}>JOGAR!</button>
                        </Link>
                        <Link to="/">
                            <button className="changeChannelButton">MUDAR CANAL</button>
                        </Link>
                    </div>
                    <div className='container-times'>
                        <div className="time-vermelho">
                            <p id='p-time-vermelho'>TIME VERMELHO:</p><span id='qnt-time-vermelho'>0</span><p>pessoas.</p>
                        </div>
                        <div className="time-azul">
                            <p id='p-time-azul'>TIME AZUL:</p><span id='qnt-time-azul'>0</span><p>pessoas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectedPage;