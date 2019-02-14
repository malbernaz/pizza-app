import styled from "@emotion/styled/macro";

export let Button = styled.button`
  appearance: none;
  font: inherit;
`;

export let Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export let VerticalCenter = styled(Center)`
  flex-direction: column;
`;

export let Wrapper = styled(VerticalCenter)`
  min-height: 100vh;

  h1 {
    text-transform: uppercase;
  }
`;
