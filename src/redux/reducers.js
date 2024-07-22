const initialState = {
  loading: true,
  answer: '',
  gen: {
    number: null,
    firstNb: null,
    lastNb: null,
  },
  pkmn: {},
  points: 0,
  turn: 1,
  quizzFinished: false,
  finalTime: '',
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SELECT_GEN':
      return {
        ...state,
        gen: {
          number: action.gen,
          firstNb: action.firstNb,
          lastNb: action.lastNb,
        },
      };

    case 'SAVE_POKEMON':
      return {
        ...state,
        pkmn: {
          name: action.pkmnName,
          img: action.pkmnImg,
        },
      };

    case 'LOADING_TRUE':
      return {
        ...state,
        loading: true,
      };

    case 'LOADING_FALSE':
      return {
        ...state,
        loading: false,
      };

    case 'SAVE_INPUT':
      return {
        ...state,
        answer: action.answer,
      };

    case 'CLEAR_INPUT':
      return {
        ...state,
        answer: '',
      };

    case 'SAVE_POINT':
      return {
        ...state,
        points: action.points,
      };

    case 'NEW_TURN':
      return {
        ...state,
        turn: state.turn + 1,
      };

    case 'QUIZZ_FINISHED':
      return {
        ...state,
        quizzFinished: true,
        finalTime: action.time,
      };

    case 'RESET_GAME':
      return {
        ...state,
        turn: 1,
        points: 0,
        answer: '',
        quizzFinish: false,
      };

    default:
      return state;
  }
}

export default reducer;
