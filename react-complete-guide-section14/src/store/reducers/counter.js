import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  counter: 20
};

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.INCREMENT) {
    return updateObject(state, { counter: state.counter + 1 });
  }

  if (action.type === actionTypes.DECREMENT) {
    return updateObject(state, { counter: state.counter - 1 });
  }

  if (action.type === actionTypes.ADD) {
    return updateObject(state, { counter: state.counter + action.val });
  }

  if (action.type === actionTypes.SUBTRACT) {
    return updateObject(state, { counter: state.counter - action.val });
  }

  return state;
};

export default reducer;
