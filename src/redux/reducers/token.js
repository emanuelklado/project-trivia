const INITIAL_STATE = null;

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_TOKEN':

    return action.payload;

  default:
    return state;
  }
};

export default token;
