export const actionLogin = (payload) => ({
  type: 'LOGIN',
  payload,
});

export const getToken = (payload) => ({
  type: 'GET_TOKEN',
  payload,
});
