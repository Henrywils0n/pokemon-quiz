/* eslint-disable quotes */
import axios from 'axios';

const ajax = (store) => (next) => (action) => {
  switch (action.type) {
    case 'GET_POKEMON_BY_ID': {
      let pkmnImg;
      let pkmnName;

      axios.get(`https://pokeapi.co/api/v2/pokemon/${action.id}`)
        .then((response) => {
          pkmnImg = response.data.sprites.other["official-artwork"].front_default;
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${action.id}`)
            .then((response2) => {
              pkmnName = response2.data.names.find((obj) => obj.language.name === 'fr').name;
              store.dispatch({
                type: 'SAVE_POKEMON',
                pkmnName: pkmnName,
                pkmnImg: pkmnImg,
              });
              store.dispatch({ type: 'LOADING_FALSE' });
            });
        })
        .catch((error) => {
          console.error('Error while fetching PokeAPI', error);
        });
      break;
    }
    default:
      break;
  }
  next(action);
};

export default ajax;
