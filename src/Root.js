import React from "react";
import { Global } from "@emotion/core";
import { Router } from "@reach/router";
import globalStyles from "./global-styles";
import Cart from "./routes/Cart";
import ChooseSize from "./routes/ChooseSize";
import ChooseToppings from "./routes/ChooseToppings";

let Root = () => (
  <>
    <Global styles={globalStyles} />
    <Router>
      <Cart path="/" />
      <ChooseSize path="/choose-size" />
      <ChooseToppings path="/choose-toppings" />
    </Router>
  </>
);

export default Root;
