import { Link } from 'react-router-dom';

import './style.scss';
import logo from '../../assets/img/logo.svg';

function Header() {
  return (
    <div className="Header">
      <Link to="/">
        <img className="Header__logo" src={logo} alt="logo" />
      </Link>
      <h1>Quel est ce Pokémon ?</h1>
    </div>
  );
}

export default Header;
