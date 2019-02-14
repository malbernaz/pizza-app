import React from "react";
import styled from "@emotion/styled/macro";
import { Link } from "@reach/router";
import * as t from "../constants";
import { useStore } from "../lib";
import { Wrapper } from "../ui-kit";
import { currencyFmt } from "../util";

let mapState = state => ({ cart: state.cart });
let mapDispatch = dispatch => ({
  removePizza(pizza) {
    dispatch({ type: t.REMOVE_PIZZA, pizza });
  }
});

export default function Cart() {
  let { cart, removePizza } = useStore(mapState, mapDispatch);

  return (
    <Wrapper>
      <h1>Cart</h1>
      {cart.length ? (
        <Table>
          <thead>
            <tr>
              <th className="name">name</th>
              <th className="toppings">toppings</th>
              <th className="price">price</th>
              <th className="remove">remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id}>
                <td className="name">{item.name}</td>
                <td className="toppings">{item.toppings.join(", ")}</td>
                <td className="price">{currencyFmt.format(item.totalPrice)}</td>
                <td className="remove" role="button" tabIndex="0" onClick={() => removePizza(item)}>
                  ×
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyCart>no pizzas yet : (</EmptyCart>
      )}
      <Total>
        <b>Total</b>: {currencyFmt.format(cart.reduce((total, item) => total + item.totalPrice, 0))}
      </Total>
      <AddBtn to="choose-size">add pizza</AddBtn>
    </Wrapper>
  );
}

let Table = styled.table`
  th,
  td {
    text-align: left;
    padding: 0.5em 1em;
  }

  .price {
    text-align: right;
  }

  td.remove {
    text-align: center;
    color: red;
    cursor: pointer;
  }
`;

let EmptyCart = styled.div`
  margin: 2em 0;
  font-weight: 700;
`;

let Total = styled.div`
  margin: 2em 0;
`;

let AddBtn = styled(Link)`
  text-transform: uppercase;
  color: #000;
  text-decoration: none;
  border-radius: 2px;
  padding: 0.5em;
  border: 1px solid;
`;
