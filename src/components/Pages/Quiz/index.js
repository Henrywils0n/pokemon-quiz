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

function Quiz() {
  const { name, img } = useSelector((state) => state.pkmn);
  const {
    loading, modelLoading, answer, modelAnswer, points, modelPoints, turn, apiAwake,
  } = useSelector((state) => state);

  const gen = useSelector((state) => state.gen);
  const showPokemon = useSelector((state) => state.showPokemon);
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
      dispatch({ type: 'MODEL_LOADING_TRUE' });
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
    if (img) {
      dispatch({
        type: 'MAKE_PREDICTION',
        imageURL: img,
      });
    }
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
      dispatch({ type: 'MODEL_LOADING_TRUE' });
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
    const modelAnswerLower = modelAnswer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const modelFaults = distance(nameLower, modelAnswerLower);
    const faults = distance(nameLower, answerLower);

    if (faults < 2) {
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

    if (modelFaults < 2) {
      const newPoints = modelPoints + 1;
      dispatch({
        type: 'SAVE_MODEL_POINT',
        modelPoints: newPoints,
      });
    }
  };

  if (loading) {
    return (
      <img className="Quiz__loading-img" src={pokeball} alt="loading" />
    );
  }
  if (!apiAwake) {
    return (
      <div>
        <img className="Quiz__loading-img" src={pokeball} alt="loading" />
        <p className="title__reduced">Freely Hosted model is waking up. This only happens in periods of no use. Please stand tight (should be 30s max).</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title__reduced">Question {turn}/10</h3>
      <div className="scoreboard">
        <div>
          <h4> Player </h4>
          <p> {points} </p>
        </div>
        <div>
          <h4> AI </h4>
          <p> {modelPoints} </p>
        </div>
      </div>
      <p>Who is this Pokemon?</p>
      <div className={`Quiz__img-container${correct}`}>
        <img className={showPkmn || showPokemon ? 'Quiz__img' : 'Quiz__img-hidden'} src={img} alt="?" />
        {showPkmn ? <p className={`Quiz__answer${correct}`}>{name}</p> : ''}
      </div>
      <form className="Quiz__form" onSubmit={handleSubmit} autoComplete="off" spellCheck="off">
        <input className="Quiz__input" value={answer} autoFocus type="text" onChange={handleChange} />
        <button className="Quiz__button" type="submit"> ► </button>
      </form>
      <div style={{ display: 'flex' }}>
        <p>
          {showPkmn && !modelLoading ? `AI guessed ${modelAnswer}` : 'AI is thinking'}
        </p>
        {!showPkmn || modelLoading ? <img className="Quiz__loading-img__small" src={pokeball} alt="loading" /> : null }
      </div>
      <div>{timer.timerDisplayStrings.minutes}:{timer.timerDisplayStrings.seconds}:{timer.timerDisplayStrings.milliseconds.slice(0, 2)}</div>
    </>
  );
}

Quiz.propTypes = {

};

export default Quiz;
