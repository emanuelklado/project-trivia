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
