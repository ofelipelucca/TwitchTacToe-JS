import '../styles/Site.css'
import '../styles/Result.css'

import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

import { TicTacToeGame } from '../Game';
import { startGame, setJogadorMaisVotou } from '../reducers'

function ResultPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    dispatch(setJogadorMaisVotou());

    const timeVencedor = useSelector(state => state.game.timeVencedor).toUpperCase();
    const votosTotais = useSelector(state => state.game.votosTotais);
    const jogadorMaisVotou = useSelector(state => state.game.jogadorMaisVotou.nome);
    const jogadorQntVotos = useSelector(state => state.game.jogadorMaisVotou.qntVotos);
    const rodadasTotais = useSelector(state => state.game.rodadaAtual);
    const vitoriasVermelho = useSelector(state => state.game.vitoriasVermelho);
    const vitoriasAzul = useSelector(state => state.game.vitoriasAzul);

    function iniciarJogo() {

        dispatch(startGame());

        const Game = new TicTacToeGame();

        Game.iniciarJogo();

        navigate('/connected/game');

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

            <div className="time-vencedor">
                <h1 id='h1-vencedor'>O TIME <span id={timeVencedor == 'VERMELHO' ? 'h1-time-vermelho' : 'h1-time-azul'}>{timeVencedor}</span> VENCEU!!</h1>
            </div>
            
            <div className="container-results">
                <span id="votos-totais">VOTOS TOTAIS: {votosTotais}</span>
                <span id="jogador-mais-votou">JOGADOR QUE MAIS VOTOU: {jogadorMaisVotou} ({jogadorQntVotos})</span>
                <span id="rodadas-totais">RODADAS TOTAIS: {rodadasTotais}</span>
                <span id="votorias-vermelho">VITÓRIAS DO TIME VERMELHO: {vitoriasVermelho}</span>
                <span id="vitorias-azul">VITÓRIAS DO TIME AZUL: {vitoriasAzul}</span>

                <div className="gameControls">        
                    <button className="startButton" onClick={iniciarJogo}>JOGAR!</button>
                    <Link to="/">
                        <button className="changeChannelButton" onClick={mudarCanal}>MUDAR CANAL</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default ResultPage;