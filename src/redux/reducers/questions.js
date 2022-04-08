const INITIAL_STATE = {};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default questions;
