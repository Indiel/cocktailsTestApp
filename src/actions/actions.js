import {getCategory, getCocktails} from '../services/cocktails-service';

export const fetchCategoriesSuccess = (categories, checkedCategories) => {
  return {
    type: 'FETCH_CATEGORIES_SUCCESS',
    payload: {categories, checkedCategories},
  };
};
export const fetchCategoriesError = err => {
  return {type: 'FETCH_CATEGORIES_ERROR', payload: err};
};
export const fetchCocktailsSuccess = categories => {
  return {type: 'FETCH_COCKTAILS_SUCCESS', payload: categories};
};
export const fetchCocktailsError = err => {
  return {type: 'FETCH_COCKTAILS_ERROR', payload: err};
};
export const addCategoryIndex = () => {
  return {type: 'ADD_CATEGORY_INDEX'};
};
export const addFilter = selectedCategory => {
  return {type: 'ADD_FILTER', payload: selectedCategory};
};
export const setCheckedCategories = selectedCategory => {
  return {type: 'SET_CHECKED_CATEGORIES', payload: selectedCategory};
};

export const fetchCategories = () => {
  return dispatch => {
    getCategory()
      .then(categories => {
        const arrCategory = [];
        const checkedCategories = [];
        categories.drinks.map(item => {
          arrCategory.push(item.strCategory);
          checkedCategories.push(false);
        });

        dispatch(fetchCategoriesSuccess(arrCategory, checkedCategories));
      })
      .catch(err => dispatch(fetchCategoriesError(err)));
  };
};

export const fetchCocktails = selectedCategory => {
  return dispatch => {
    getCocktails(selectedCategory)
      .then(cocktails => {
        const newCocktailsList = [
          {
            title: selectedCategory,
            data: cocktails.drinks,
          },
        ];

        dispatch(fetchCocktailsSuccess(newCocktailsList));
      })
      .catch(err => dispatch(fetchCocktailsError(err)));
  };
};
