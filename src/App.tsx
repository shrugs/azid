import React, { useState, useMemo } from "react";
import styled from "styled-components";
import decode from "jwt-decode";
import { LoginButton } from "./LoginButton";

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

export default function App() {
  const [isLoggingIn, setLoggingIn] = useState(false);
  const [token, setToken] = useState();

  const decoded = useMemo(() => (token ? decode(token) : null), [token]);

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
          onToken={function(token) {
            setToken(token);
            setLoggingIn(false);
          }}
        />
      )}
      {token && (
        <>
          <Text>I just got a JWT back!</Text>
          <Text>It looks like:</Text>
          <Code>{token}</Code>
          <Text>And decodes to:</Text>
          <Code>{JSON.stringify(decoded)}</Code>
        </>
      )}
    </Container>
  );
}
