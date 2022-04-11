const INITIAL_STATE = {
  userName: '',
  assertions: 0,
  score: 0,
  userEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, ...action.payload };
  case 'SCORE':
    return { ...state, score: state.score + action.payload };
  case 'ASSERTION':
    return { ...state, assertions: state.assertions + 1 };
  case 'RESET_ASSERTION':
    return { ...state, assertions: 0 };
  default:
    return state;
  }
};

export default player;
