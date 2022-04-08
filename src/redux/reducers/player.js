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
  default:
    return state;
  }
};

export default player;
