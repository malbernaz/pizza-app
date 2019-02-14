import React, { useState, createContext, useContext, useEffect } from "react";

export function graphql(query, ...exps) {
  if (exps.length) {
    throw new Error("error: graphql`` template literal do not support expressions.");
  }

  let string = String.raw(query);

  return {
    string,
    async request(variables) {
      let init = {
        method: "POST",
        body: JSON.stringify({ query: string, variables }),
        headers: {
          "content-type": "application/json"
        }
      };

      let res = await fetch("https://core-graphql.dev.waldo.photos/pizza", init);

      return res.json();
    }
  };
}

export let ctx = createContext({});

export let GraphqlProvider = ({ children }) => {
  let [state, setState] = useState({});

  return <ctx.Provider value={{ state, setState }}>{children}</ctx.Provider>;
};

export function useQuery(query, variables = {}) {
  let { string, request } = query;
  let { state, setState } = useContext(ctx);
  let key = `${string}:${JSON.stringify(variables)}`;
  let cachedQuery = state[key] || { loading: false, loaded: false };

  useEffect(() => {
    if (!cachedQuery.loaded) {
      setState({
        ...state,
        [key]: {
          loading: true,
          loaded: false
        }
      });

      request(variables).then(result => {
        setState({
          ...state,
          [key]: {
            ...result,
            loading: false,
            loaded: true
          }
        });
      });
    }
  }, [key]);

  return cachedQuery;
}
