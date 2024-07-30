/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable max-len */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';

function Score() {
  const {
    points, modelPoints, finalTime, quizFinished,
  } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!quizFinished) {
      navigate('/');
    }
  });

  return (
    <>
      <div className="results">
        <div>
          <h2 className="title">Your Score</h2>
          <p className="Score__points">{points}/10</p>
        </div>
        <div>
          <h2 className="title">Model Score</h2>
          <p className="Score__points">{modelPoints}/10</p>
        </div>
      </div>
      {points === 0 && points <= modelPoints && <p className="title__reduced">keep practicing...</p>}
      {points > 0 && points < 4 && points > modelPoints && <p className="title__reduced"> A bit lucky. You win though. </p>}
      {points > 0 && points < 4 && points < modelPoints && <p className="title__reduced"> Not quite. Go study your pokemon. </p>}
      {points >= 4 && points < 8 && points > modelPoints && <p className="title__reduced"> You win! Congrats</p>}
      {points >= 4 && points < 8 && points < modelPoints && <p className="title__reduced"> Almost there </p>}
      {points >= 8 && points < 10 && points > modelPoints && <p className="title__reduced">You beat the CNN. Congrats</p>}
      {points >= 8 && points < 10 && points < modelPoints && <p className="title__reduced">A valiant effort</p>}
      {points === 10 && <p className="title__reduced">True mastery. The robots do not stand a chance.</p>}
      <p>{finalTime.slice(3, -1)}</p>
      <Link to="/category">
        <button autoFocus className="Score__button" type="button">Play again</button>
      </Link>
    </>
  );
}

export default Score;
