import React from "react";

export let ctx = React.createContext();

export let StoreProvider = ({ children, initialState, reducer }) => {
  let [state, dispatch] = React.useReducer(reducer, initialState);

  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
};

export function useStore(mapState, mapDispatch) {
  let { state, dispatch } = React.useContext(ctx);

  return {
    ...(mapState ? mapState(state) : state),
    ...(mapDispatch ? mapDispatch(dispatch) : {})
  };
}
