import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

import bulbizarre from '../../../assets/img/bulbizarre.png';

function Home() {
  return (
    <>
      <h2 className="title">Quel est ce Pokémon&nbsp;?</h2>
      <p>Trouvez le nom des pokémons dans un quizz aléatoire</p>
      <div className="Home__img-container">
        <img className="Home__exemple1" src={bulbizarre} alt="exemple" />
        <img className="Home__exemple2" src={bulbizarre} alt="exemple" />
      </div>
      <Link to="/categorie">
        <button className="Home__start-button" type="button">
          Démarrer !
        </button>
      </Link>
    </>
  );
}

Home.propTypes = {

};

export default Home;
