const fetchToken = async () => {
  const tokenUrl = 'https://opentdb.com/api_token.php?command=request';
  const result = await fetch(tokenUrl);
  const resolve = await result.json();
  return resolve;
};

export default fetchToken;
