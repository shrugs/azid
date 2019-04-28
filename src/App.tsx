import React, { useState } from "react";
import styled from "styled-components";
import { LoginButton } from "./LoginButton";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p``;

const Code = styled.code`
  word-break: break-all;
  margin: 1rem;
`;

const Button = styled.button``;

export default function App() {
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [wallet, setWallet] = useState();

  return (
    <Container>
      <Text>Azimuth login test.</Text>
      <Button onClick={() => setLoggingIn(true)}>Log In with Azimuth</Button>
      {isLoggingIn && (
        <LoginButton
          onClose={function(...args) {
            console.log(...args);
          }}
          onRender={function(...args) {
            console.log(...args);
          }}
          onError={function(...args) {
            console.log(...args);
          }}
          onWallet={function(wallet) {
            setWallet(wallet);
            setLoggingIn(false);
          }}
        />
      )}
      {wallet && (
        <>
          <Text>I just got a Wallet back!</Text>
          <Text>It looks like:</Text>
          <Code>{JSON.stringify(wallet)}</Code>
        </>
      )}
    </Container>
  );
}
