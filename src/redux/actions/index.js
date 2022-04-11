export const actionLogin = (payload) => ({
  type: 'LOGIN',
  payload,
});

export const getToken = (payload) => ({
  type: 'GET_TOKEN',
  payload,
});

export const getQuestions = (payload) => ({
  type: 'GET_QUESTIONS',
  payload,
});

export const sendScore = (payload) => ({
  type: 'SCORE',
  payload,
});

export const sendAssertion = () => ({
  type: 'ASSERTION',
});

export const resetAssertion = () => ({
  type: 'RESET_ASSERTION',
});
