import * as actionTypes from '../actions';

const initialState = {
  results: []
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.STORE_RESULT) {
    return {
      ...state,
      results: state.results.concat({id: new Date(), value: action.result})
    }
  }

  if (action.type === actionTypes.DELETE_RESULT) {
    // const id = 2;
    // const newResults = [...state.results];
    // newResults.splice(id, 1);
    const updatedArray = state.results.filter(result => {
      return result.id !== action.resultId;
    });

    return {
      ...state,
      results: updatedArray
    }
  }

  return state;
};

export default reducer;
