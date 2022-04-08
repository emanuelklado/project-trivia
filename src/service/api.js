const fetchToken = async () => {
  const tokenUrl = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(tokenUrl);
  const resolve = await result.json();
  return resolve;
};

const fetchApiGame = async (token) => {
  const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const resolve = await result.json();
  return resolve;
};

export { fetchToken, fetchApiGame };
