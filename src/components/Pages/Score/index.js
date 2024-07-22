/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable max-len */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';

function Score() {
  const { points, finalTime, quizzFinished } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    if (!quizzFinished) {
      navigate('/');
    }
  });

  return (
    <>
      <h2 className="title">Score</h2>
      <p className="Score__points">{points}/10</p>
      <p>{finalTime.slice(3, -1)}</p>
      {points === 0 && <p>Zéro pointé. As-tu déjà vu ces bestioles avant ?</p>}
      {points > 0 && points < 4 && <p>Dommage dresseur. Il y a encore une bonne marge de progression.</p>}
      {points >= 4 && points < 8 && <p>Pas mal, dresseur. Mais il va falloir s'entrainer pour devenir un maitre.</p>}
      {points >= 8 && points < 10 && <p>Très bien, dresseur ! Vous êtes sur la bonne voie pour devenir un expert.</p>}
      {points === 10 && <p>Félicitations, dresseur ! Vous êtes un expert, un maître Pokémon !</p>}
      <Link to="/categorie">
        <button autoFocus className="Score__button" type="button">Recommencer</button>
      </Link>
    </>
  );
}

export default Score;
