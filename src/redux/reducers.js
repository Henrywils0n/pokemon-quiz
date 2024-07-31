const initialState = {
  loading: true,
  modelLoading: true,
  answer: '',
  modelAnswer: '',
  gen: {
    number: null,
    firstNb: null,
    lastNb: null,
  },
  pkmn: {},
  points: 0,
  modelPoints: 0,
  turn: 1,
  quizFinished: false,
  finalTime: '',
  showPokemon: false,
  apiAwake: false,
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

    case 'API_AWAKE':
      return {
        ...state,
        apiAwake: true,
      };

    case 'LOADING_TRUE':
      return {
        ...state,
        loading: true,
      };

    case 'MODEL_LOADING_TRUE':
      return {
        ...state,
        modelLoading: true,
      };

    case 'LOADING_FALSE':
      return {
        ...state,
        loading: false,
      };

    case 'MODEL_LOADING_FALSE':
      return {
        ...state,
        modelLoading: false,
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
        modelAnswer: '',
      };

    case 'SAVE_MODEL_ANSWER':
      return {
        ...state,
        modelAnswer: action.modelAnswer,
      };

    case 'SAVE_POINT':
      return {
        ...state,
        points: action.points,
      };

    case 'SAVE_MODEL_POINT':
      return {
        ...state,
        modelPoints: action.modelPoints,
      };

    case 'NEW_TURN':
      return {
        ...state,
        turn: state.turn + 1,
      };

    case 'QUIZZ_FINISHED':
      return {
        ...state,
        quizFinished: true,
        finalTime: action.time,
      };

    case 'RESET_GAME':
      return {
        ...state,
        turn: 1,
        points: 0,
        modelPoints: 0,
        answer: '',
        modelAnswer: ',',
        quizFinish: false,
      };

    case 'SHOW_POKEMON':
      return {
        ...state,
        showPokemon: action.showPokemon,
      };

    default:
      return state;
  }
}

export default reducer;
