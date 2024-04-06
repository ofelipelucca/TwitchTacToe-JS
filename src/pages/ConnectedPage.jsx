import '../styles/Site.css'
import '../styles/Connected.css'

import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { TicTacToeGame } from '../Game'
import { limparTimes, startGame } from '../reducers'
import { startMontagemTimes } from '../reducers'

function ConnectedPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const timeVermelhoLength = useSelector(state => state.game.timeVermelho ? state.game.timeVermelho.length : 0);

    const timeAzulLength = useSelector(state => state.game.timeAzul ? state.game.timeAzul.length : 0);

    dispatch(startMontagemTimes());
    
    function iniciarJogo() {

        dispatch(startGame());

        const Game = new TicTacToeGame();

        Game.iniciarJogo();

        navigate('game');

        Game.definirOnGameEnd(() => {
            navigate('/results');
        });
    }

    function mudarCanal() {
        
        dispatch(limparTimes());
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
        
                        <button className="startButton" onClick={iniciarJogo}>JOGAR!</button>
                        <Link to="/">
                            <button className="changeChannelButton" onClick={mudarCanal}>MUDAR CANAL</button>
                        </Link>
                    </div>
                    <div className='container-times'>
                        <div className="time-vermelho">
                            <p id='p-time-vermelho'>TIME VERMELHO:</p><span id='qnt-time-vermelho'>{timeVermelhoLength}</span><p>pessoas.</p>
                        </div>
                        <div className="time-azul">
                            <p id='p-time-azul'>TIME AZUL:</p><span id='qnt-time-azul'>{timeAzulLength}</span><p>pessoas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectedPage;