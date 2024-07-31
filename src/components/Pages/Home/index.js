import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './style.scss';

import bulbizarre from '../../../assets/img/bulbizarre.png';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'WAKE_UP' });
  });

  return (
    <>
      <h2 className="title">Pokemon Quiz</h2>
      <p>Compete against popular AI vision models to name the pokemon that appear on the screen.</p>
      <div className="Home__img-container">
        <img className="Home__example1" src={bulbizarre} alt="example" />
        <img className="Home__example2" src={bulbizarre} alt="example" />
      </div>
      <Link to="/category">
        <button className="Home__start-button" type="button">
          Begin!
        </button>
      </Link>
    </>
  );
}

Home.propTypes = {

};

export default Home;
