import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  results: []
};

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter(result => {
    return result.id !== action.resultId;
  });

  return updateObject(state, { results: updatedArray });
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.STORE_RESULT) {
    return updateObject(
      state,
      { results: state.results.concat({id: new Date(), value: action.result}) });
  }

  if (action.type === actionTypes.DELETE_RESULT) {
    return deleteResult(state, action);
  }

  return state;
};

export default reducer;
