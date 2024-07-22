import './style.scss';

function Footer() {
  return (
    <div className="Footer">
      <p className="Footer__text">All content is © Nintendo, Game Freak, and The Pokémon Company.</p>
      <p className="Footer__text">Fetching data from <a className="Footer__text--link" href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokeAPI</a></p>
      <a href="https://nicolasmarques.fr" target="_blank" rel="noreferrer">
        <p className="Footer__text--link">A propos de l'auteur du site</p>
      </a>
    </div>
  );
}

export default Footer;
