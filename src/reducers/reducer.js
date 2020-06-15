const initialState = {
  categories: [],
  categoryIndex: 8,
  cocktailList: [],
  checkedCategories: [],
  filter: [],
  error: false,
  reloadDrinksScreen: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        categories: action.payload.categories,
        checkedCategories: action.payload.checkedCategories,
        filter: action.payload.categories,
        error: false,
      };

    case 'FETCH_CATEGORIES_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'FETCH_COCKTAILS_SUCCESS':
      return {
        ...state,
        cocktailList: state.reloadDrinksScreen
          ? action.payload
          : [...state.cocktailList, ...action.payload],
        error: false,
        reloadDrinksScreen: false,
      };

    case 'FETCH_COCKTAILS_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'ADD_CATEGORY_INDEX':
      return {
        ...state,
        categoryIndex: state.categoryIndex + 1,
      };

    case 'SET_CHECKED_CATEGORIES':
      const newArr = [...state.checkedCategories];
      newArr[action.payload] = state.checkedCategories[action.payload]
        ? false
        : true;

      return {
        ...state,
        checkedCategories: newArr,
      };

    case 'ADD_FILTER':
      return {
        ...state,
        filter: action.payload,
        categoryIndex: 0,
        reloadDrinksScreen: true,
      };

    default:
      return state;
  }
};

export default reducer;
