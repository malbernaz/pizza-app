import React from "react";
import ReactDom from "react-dom";
import { GraphqlProvider, StoreProvider } from "./lib";
import Root from "./Root";

let mnt = document.querySelector("#mnt");

export default function bootstrap(store) {
  ReactDom.render(
    <StoreProvider {...store}>
      <GraphqlProvider>
        <Root />
      </GraphqlProvider>
    </StoreProvider>,
    mnt
  );
}
