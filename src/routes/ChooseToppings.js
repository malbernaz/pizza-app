import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import styled from "@emotion/styled/macro";
import * as t from "../constants";
import { useStore, graphql, useQuery } from "../lib";
import { Wrapper, VerticalCenter, Button } from "../ui-kit";
import { currencyFmt } from "../util";

let query = graphql`
  query($name: PizzaSizes) {
    pizza: pizzaSizeByName(name: $name) {
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
    }
  }
`;

let mapState = state => ({ currentSize: state.currentSize });
let mapDispatch = dispatch => ({
  addPizza(pizza) {
    dispatch({ type: t.ADD_PIZZA, pizza });
    navigate("/");
  }
});

export default function ChooseToppings() {
  let { currentSize, addPizza } = useStore(mapState, mapDispatch);
  let { data, loaded } = useQuery(query, { name: currentSize.name.toUpperCase() });
  let [toppings, setToppings] = useState(normalizeToppings(loaded ? data.pizza.toppings : []));
  let toppingsQnt = toppings.filter(t => t.checked).length;
  let toppingsPrice = toppings.reduce((total, t) => total + (t.checked ? t.topping.price : 0), 0);
  let totalPrice = currentSize.basePrice + toppingsPrice;
  let toppingsLimitReached = currentSize.maxToppings === toppingsQnt;

  useEffect(() => {
    if (loaded) {
      setToppings(normalizeToppings(data.pizza.toppings));
    }
  }, [loaded]);

  let toggleTopping = toppingName => {
    setToppings(
      toppings.map(t => (t.topping.name === toppingName ? { ...t, checked: !t.checked } : t))
    );
  };

  let submit = e => {
    e.preventDefault();

    addPizza({
      ...currentSize,
      totalPrice,
      toppings: toppings.filter(t => t.checked).map(t => t.topping.name)
    });
  };

  return (
    <Wrapper>
      <h1>choose your toppings:</h1>
      <Form as="form" onSubmit={submit}>
        {loaded
          ? toppings.map(t => (
              <Topping key={t.topping.name}>
                <input
                  type="checkbox"
                  checked={t.checked}
                  disabled={!t.checked && toppingsLimitReached}
                  onChange={() => toggleTopping(t.topping.name)}
                />
                <span className="name">{t.topping.name}</span>
                <span className="price">{currencyFmt.format(t.topping.price)}</span>
              </Topping>
            ))
          : "loading toppings..."}
        <Summary>
          <h2>Sumary:</h2>
          <span>
            <b>size:</b> {currentSize.name}
          </span>
          <span style={{ color: toppingsLimitReached ? "red" : "" }}>
            <b>toppings limit:</b> {currentSize.maxToppings || "unlimited"}
          </span>
          <span>
            <b>base price:</b> {currencyFmt.format(currentSize.basePrice)}
          </span>
          <span>
            <b>total price:</b> {currencyFmt.format(totalPrice)}
          </span>
        </Summary>
        <Button>add pizza</Button>
      </Form>
    </Wrapper>
  );
}

let normalizeToppings = toppings => toppings.map(t => ({ checked: t.defaultSelected, ...t }));

let Form = styled(VerticalCenter)`
  align-items: flex-start;
`;

let Topping = styled.label`
  padding: 0.5em 0;
  border-bottom: 1px solid;
  width: 100%;

  &:last-of-type {
    border-bottom: none;
  }

  input:disabled ~ * {
    opacity: 0.5;
  }

  .name {
    margin-left: 0.5em;
  }

  .price {
    margin-left: 2em;
    float: right;
  }
`;

let Summary = styled(VerticalCenter)`
  align-items: flex-start;
  margin-bottom: 2em;
`;
