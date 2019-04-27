import ReactDOM from "react-dom";
import React from "react";
import styled from "styled-components";

import "./LoginWithAzimuth";

const exampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb2ludCI6In5ib3NueXQtcmFkZHV4IiwiYmlwMzkiOjE1MTYyMzkwMjJ9.a5Bos7rcvzubbP9N7V2ZD5iV2h_Wcz2ba706K4-Bn-M";
// ^ this is HS256 with secret "password"
// but in real life this would definitely be an ES256-signed JWT

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p``;

const Code = styled.code``;

const Button = styled.button``;

interface FrameWindow {
  xprops: {
    onToken: Function;
    close: Function;
  };
}

function Frame() {
  const xprops = ((window as unknown) as FrameWindow).xprops;

  console.log(xprops);

  const makeToken = () => {
    xprops.onToken(exampleToken);
    xprops.close();
  };

  return (
    <Container>
      <Text>Hi I'm a frame! I was given props:</Text>
      <Code>{JSON.stringify(xprops)}</Code>
      <Button onClick={makeToken}>Log In with Azimuth</Button>
    </Container>
  );
}

ReactDOM.render(<Frame />, document.getElementById("root"));
