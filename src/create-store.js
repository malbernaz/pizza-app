import * as t from "./constants";

export default function createStore() {
  let initialState = { cart: [], currentSize: null };

  function reducer(state = initialState, action) {
    switch (action.type) {
      case t.ADD_PIZZA:
        return {
          ...state,
          cart: [...state.cart, action.pizza]
        };
      case t.UPDATE_PIZZA:
        return {
          ...state,
          cart: state.cart.map(pizza => (pizza.id === action.pizza.id ? action.pizza : pizza))
        };
      case t.REMOVE_PIZZA:
        return {
          ...state,
          cart: state.cart.filter(pizza => pizza.id !== action.pizza.id)
        };
      case t.SET_CURRENT_SIZE:
        return {
          ...state,
          currentSize: action.currentSize
        };
      default:
        return state;
    }
  }

  return { initialState, reducer };
}
