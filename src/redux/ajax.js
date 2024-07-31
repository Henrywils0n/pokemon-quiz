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
              pkmnName = response2.data.names.find((obj) => obj.language.name === 'en').name;
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
    case 'MAKE_PREDICTION': {
      const { imageURL } = action;
      axios.post('https://pokenet.onrender.com/predict', { url: imageURL })
        .then((response) => {
          store.dispatch({
            type: 'SAVE_MODEL_ANSWER',
            modelAnswer: response.data.prediction,
          });
          store.dispatch({ type: 'MODEL_LOADING_FALSE' });
        })
        .catch((error) => {
          console.error('Error while making prediction', error);
          store.dispatch({ type: 'MODEL_LOADING_FALSE' }); // Ensure loading is set to false even on error
        });
      break;
    }
    case 'WAKE_UP': {
      axios.get('https://pokenet.onrender.com/wakeup')
        .then(() => {
          store.dispatch({
            type: 'API_AWAKE',
          });
        })
        .catch((error) => {
          console.error('API Inactive:', error);
        });
      break;
    }
    default:
      break;
  }
  next(action);
};

export default ajax;
