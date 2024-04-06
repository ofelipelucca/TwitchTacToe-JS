import React, { useState, useEffect } from 'react';
import store from '../../store';

function Timer() {
  const TempoMaximoRodada = store.getState().game.tempoMaximoRodada;
  const [tempoRestante, setTempoRestante] = useState(TempoMaximoRodada);

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoRestante(prevTempo => {
        return prevTempo > 1 ? prevTempo - 1 : TempoMaximoRodada;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [TempoMaximoRodada]);

  return (
    <div>
      <h2 id='votacao-timer'>TEMPO DE VOTAÇÃO: {tempoRestante} restantes</h2>
    </div>
  );
}

export default Timer;