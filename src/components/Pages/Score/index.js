/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable max-len */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';

function Score() {
  const { points, finalTime, quizFinished } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!quizFinished) {
      navigate('/');
    }
  });

  return (
    <>
      <h2 className="title">Score</h2>
      <p className="Score__points">{points}/10</p>
      <p>{finalTime.slice(3, -1)}</p>
      {points === 0 && <p>keep practicing...</p>}
      {points > 0 && points < 4 && <p>You are getting there.</p>}
      {points >= 4 && points < 8 && <p>Pretty good</p>}
      {points >= 8 && points < 10 && <p>You know your stuff</p>}
      {points === 10 && <p>Pokemon master</p>}
      <Link to="/category">
        <button autoFocus className="Score__button" type="button">Play again</button>
      </Link>
    </>
  );
}

export default Score;
