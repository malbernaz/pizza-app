import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import { navigate } from "@reach/router";
import * as t from "../constants";
import { graphql, useQuery } from "../lib/graphql";
import { Button, Center, VerticalCenter, Wrapper } from "../ui-kit";
import { useStore } from "../lib";
import { currencyFmt } from "../util";

let query = graphql`
  query {
    pizzaSizes {
      name
      maxToppings
      basePrice
    }
  }
`;

let mapDispatch = dispatch => ({
  chooseSize(size) {
    let id = Math.random()
      .toString(36)
      .substr(2);
    let pizza = { ...size, id };

    dispatch({ type: t.SET_CURRENT_SIZE, currentSize: pizza });
    navigate("/choose-toppings");
  }
});

export default function ChooseSize() {
  let { chooseSize } = useStore(null, mapDispatch);
  let { data, loaded } = useQuery(query);
  let [currentSize, setSize] = useState({});

  let submit = e => {
    e.preventDefault();

    chooseSize(currentSize);
  };

  return (
    <Wrapper>
      <h1>choose your size:</h1>
      {loaded ? (
        <VerticalCenter as="form" onSubmit={submit}>
          <Center>
            {data.pizzaSizes.map(size => (
              <Size key={size.name}>
                <input
                  type="radio"
                  value={size.name}
                  checked={currentSize.name === size.name}
                  onChange={() => setSize(size)}
                />
                <VerticalCenter>
                  <h2>{size.name.toUpperCase()}</h2>
                  <div className="price">{currencyFmt.format(size.basePrice)}</div>
                </VerticalCenter>
              </Size>
            ))}
          </Center>
          <Button disabled={!currentSize.name}>submit</Button>
        </VerticalCenter>
      ) : (
        "loading sizes..."
      )}
    </Wrapper>
  );
}

let Size = styled.label`
  display: block;
  position: relative;
  margin: 2em 1em;
  border: 1px solid;
  padding: 0.5em 1em;

  input {
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  h2 {
    font-size: 1em;
  }

  .price {
    font-size: 2em;
  }
`;
