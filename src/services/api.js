export async function requestToken() {
  const TOKEN_ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  try {
    const request = await fetch(TOKEN_ENDPOINT);
    const resolvedToken = await request.json();
    localStorage.setItem('token', JSON.stringify(resolvedToken.token));
    return resolvedToken.token;
  } catch (e) {
    console.log(e);
  }
}

export async function getCategoryID(whichCategory) {
  const CATEGORIES_ENDPOINT = 'https://opentdb.com/api_category.php';
  try {
    const categoriesData = await fetch(CATEGORIES_ENDPOINT);
    const { trivia_categories: categories } = await categoriesData.json();
    const filtered = categories.find((category) => category.name.includes(whichCategory));
    return filtered.id;
  } catch (e) {
    console.log(e);
  }
}

export async function getQuestions(nQuestions, cat = '', token) {
  const catID = await getCategoryID(cat);
  const definedCategory = cat ? `&category=${catID}` : '';
  const TRIVIA_ENDPOINT = `https://opentdb.com/api.php?amount=${nQuestions}${definedCategory}&token=${token}`;
  try {
    const data = await fetch(TRIVIA_ENDPOINT);
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}
