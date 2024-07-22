import { Link } from 'react-router-dom';

import './style.scss';

import bulbizarre from '../../../assets/img/bulbizarre.png';

function Home() {
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
