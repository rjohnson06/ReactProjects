import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
}

const reducer = (state = initialState, action) => {
  if (action.type === actionTypes.PURCHASE_BURGER_SUCCESS) {
    const newOrder = updateObject(action.orderData, { id: action.orderId });

    return updateObject(state, {
      loading: false,
      purchased: true,
      orders: state.orders.concat(newOrder)
    });
  } else if (action.type === actionTypes.PURCHASE_BURGER_FAIL) {
    return updateObject(state, { loading: false });
  } else if (action.type === actionTypes.PURCHASE_BURGER_START) {
    return updateObject(state, { loading: true });
  } else if (action.type === actionTypes.PURCHASE_INIT) {
    return purchaseInit(state, action);
  } else if (action.type === actionTypes.FETCH_ORDERS_START) {
    return updateObject(state, { loading: true });
  } else if (action.type === actionTypes.FETCH_ORDERS_SUCCESS) {
    return updateObject(state, { orders: action.orders, loading: false });
  } else if (action.type === actionTypes.FETCH_ORDERS_FAIL) {
    return updateObject(state, { loading: false });
  }

  return state;
};

export default reducer;
