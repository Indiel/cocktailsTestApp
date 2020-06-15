const urlCategoriesList =
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const urlCategory = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export async function getCategory() {
  const response = await fetch(urlCategoriesList);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.message}`);
  }

  return response.json();
}

export async function getCocktails(selectedCategory) {
  const response = await fetch(
    `${urlCategory}${selectedCategory.replace(/ /g, '_')}`,
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.message}`);
  }

  return response.json();
}
