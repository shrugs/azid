import "normalize.css";
import "./reset.css";

import ReactDOM from "react-dom";
import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import { isValidPatp, isValidPatq, patp2dec, patq2hex } from "urbit-ob";
import { argon2u, deriveNode } from "urbit-key-generation";

const stableIsValidPatp = (...args) => {
  try {
    return isValidPatp(...args);
  } catch {
    return false;
  }
};

const stableIsValidPatq = (...args) => {
  try {
    return isValidPatq(...args);
  } catch {
    return false;
  }
};

import "./LoginWithAzimuth";
// ^ this needs to be here. love implicit dependencies. good one, zoid -_-

import ObInput from "./ObInput";
import console = require("console");

const theme = {
  primaryColor: "#000",
  textPrimaryColor: "#000",
  textSecondaryColor: "#FFF",
};

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Helvetica Neue", "Ubuntu", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: ${props => props.theme.textPrimaryColor};
`;

const Container = styled(Flex).attrs(props => ({
  column: true,
  center: true,
  full: true,
}))`
  padding: 1rem;
`;

const Header = styled(FlexItem)`
  width: 100%;
  background-color: ${props => props.theme.primaryColor};
  height: 20vh;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PText = styled(Text)`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom 0.5rem;
`;

const HeaderText = styled(Text)`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${props => props.theme.textSecondaryColor};
`;

const ShipInput = styled(FlexItem)`
  width: 100%;
`;

const TicketInput = styled(FlexItem)`
  width: 100%;
`;

const Button = styled(Text.withComponent("a"))`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  outline: none;
  overflow: hidden;
  min-height: 2.5rem;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: #fff;
  border-radius: 4px;
  letter-spacing: 0.025em;
  text-decoration: none;
  transition: all 0.15s ease;
  font-size: 0.5rem;
  text-transform: uppercase;

  pointer-events: ${(props: any) => (props.disabled ? "none" : "all")};
  opacity: ${(props: any) => (props.disabled ? 0.7 : 1)};

  &:hover {
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

interface FrameWindow {
  xprops: XProps;
}

interface XProps {
  serviceName: string;
  serviceId: string;
  onWallet: Function;
  close: Function;
}

function Frame() {
  const xprops: XProps =
    ((window as unknown) as FrameWindow).xprops || ({} as XProps);
  const {
    serviceName = "Unknown Service",
    serviceId = "com.unknown.service",
  } = xprops;

  // TODO: these service name/ids should 100% be tracked in a registry on Ethereum, tied to domain names, or a malicious service could request a collision

  const [ship, setShip] = useState("");
  const [ticket, setTicket] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidShip = stableIsValidPatp(ship);
  const isValidTicket = stableIsValidPatq(ticket);
  const isValid = isValidShip && isValidTicket;

  const makeToken = async () => {
    setLoading(true);
    // use the ticket to derive a custom node for this service
    const point = parseInt(patp2dec(ship), 10);
    const buf = Buffer.from(patq2hex(ticket), "hex");
    const masterSeed = await argon2u(buf, point);

    const wallet = await deriveNode(masterSeed, serviceId);

    xprops.onWallet(wallet);
    xprops.close();
  };

  return (
    <ThemeProvider theme={theme}>
      <Flex column alignStart justifyStart>
        <Header>
          <HeaderText as="h1">Authenticate with Azimuth</HeaderText>
        </Header>
        <FlexItem grow>
          <Container>
            <ShipInput>
              <Flex column>
                <PText>Ship</PText>
                <ObInput bytes={4} onChange={setShip} />
              </Flex>
            </ShipInput>

            <TicketInput>
              <Flex column>
                <PText>Ticket</PText>
                <ObInput bytes={8} onChange={setTicket} />
              </Flex>
            </TicketInput>

            <FlexItem>
              <Button onClick={makeToken} disabled={!isValid || loading}>
                {loading ? "Computing..." : `Authenticate ${serviceName}`}
              </Button>
            </FlexItem>
          </Container>
        </FlexItem>
      </Flex>
    </ThemeProvider>
  );
}

ReactDOM.render(<Frame />, document.getElementById("root"));
