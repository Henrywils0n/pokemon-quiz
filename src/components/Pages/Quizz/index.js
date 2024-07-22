/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { distance } from 'fastest-levenshtein';
import { useTimer } from 'react-timer-and-stopwatch';

import './style.scss';
import pokeball from '../../../assets/img/pokeball.svg';
import { getTenDifferentNumber } from '../../../utils';

function Quizz() {
  const { name, img } = useSelector((state) => state.pkmn);
  // eslint-disable-next-line object-curly-newline
  const { loading, answer, points, turn } = useSelector((state) => state);
  const gen = useSelector((state) => state.gen);

  const [showPkmn, setShowPkmn] = useState(false);
  const [correct, setCorrect] = useState('');
  const [stop, setStop] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timeoutId = useRef(null);
  const pkmnIds = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutId.current);
    if (gen.number === null) {
      navigate('/');
    }
    else {
      dispatch({ type: 'RESET_GAME' });
      dispatch({ type: 'LOADING_TRUE' });
      pkmnIds.current = getTenDifferentNumber(gen.firstNb, gen.lastNb);
      dispatch({
        type: 'GET_POKEMON_BY_ID',
        id: pkmnIds.current[0],
      });
    }
  }, []);

  const handleChange = (event) => {
    dispatch({
      type: 'SAVE_INPUT',
      answer: event.target.value,
    });
  };

  const timer = useTimer({
    create: { stopwatch: {} },
    includeMilliseconds: true,
    intervalRate: 10,
  });

  useEffect(() => {
    timer.resumeTimer();
  }, [img]);

  const newTurn = () => {
    if (turn === 10) {
      dispatch({
        type: 'QUIZZ_FINISHED',
        time: timer.timerText,
      });
      navigate('/score');
    }
    else {
      setShowPkmn(false);
      setCorrect('');
      setStop(false);
      dispatch({ type: 'NEW_TURN' });
      dispatch({ type: 'CLEAR_INPUT' });
      dispatch({ type: 'LOADING_TRUE' });
      dispatch({
        type: 'GET_POKEMON_BY_ID',
        id: pkmnIds.current[parseInt(turn, 10)],
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    timer.pauseTimer();
    if (stop) {
      clearTimeout(timeoutId.current);
      newTurn();
      return;
    }
    setStop(true);
    const nameLower = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const answerLower = answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const faults = distance(nameLower, answerLower);

    if (faults < 3) {
      const newPoints = points + 1;
      dispatch({
        type: 'SAVE_POINT',
        points: newPoints,
      });
      setCorrect('--green');
    }
    else {
      setCorrect('--red');
    }
    setShowPkmn(true);
    timeoutId.current = setTimeout(newTurn, 2000);
  };

  if (loading) {
    return (
      <img className="Quizz__loading-img" src={pokeball} alt="loading" />
    );
  }

  return (
    <>
      <h3 className="title">Question {turn}/10</h3>
      <p>Quel est le nom de ce Pokémon ?</p>
      <div className={`Quizz__img-container${correct}`}>
        <img className={showPkmn ? 'Quizz__img' : 'Quizz__img-hidden'} src={img} alt="?" />
        {showPkmn ? <p className={`Quizz__answer${correct}`}>{name}</p> : ''}
      </div>
      <form className="Quizz__form" onSubmit={handleSubmit} autoComplete="off" spellCheck="off">
        <input className="Quizz__input" value={answer} autoFocus type="text" onChange={handleChange} />
        <button className="Quizz__button" type="submit"> ► </button>
      </form>
      <div>{timer.timerDisplayStrings.minutes}:{timer.timerDisplayStrings.seconds}:{timer.timerDisplayStrings.milliseconds.slice(0, 2)}</div>
    </>
  );
}

Quizz.propTypes = {

};

export default Quizz;
