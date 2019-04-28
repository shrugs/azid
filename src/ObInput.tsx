import React, { useState, useRef, createRef } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import { times } from "lodash";

const kPhonemeLength = 3; // characters
const kSectionSize = 2; // phonemes

const Container = styled(Flex).attrs({ wrap: 1 })``;

const Block = styled(Flex).attrs({ centered: true })`
  margin-bottom: 0.5rem;
`;

const Section = styled(FlexItem).attrs({})``;

const Hyphen = styled.div.attrs(props => ({ children: "—" }))`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
`;

const ExampleLink = styled(Flex)`
  cursor: pointer;
  font-size: 0.8rem;
  margin-bottom: 1rem;

  & > a {
    margin-left: 0.2rem;
    color: lightblue;
  }
`;

const Input = styled.input.attrs(props => ({
  type: "text",
  maxLength: kPhonemeLength * kSectionSize,
  autocomplete: "off",
  autocorrect: "off",
  autocapitalize: "off",
  spellcheck: false,
}))`
  width: 100%;
  font-family: monospace;
  color: ${props => props.theme.textPrimaryColor};
  padding: 0.125rem;
  font-size: 1.5rem;
  line-height: 1.5rem;

  border-radius: 0.25rem;
  border: none;
  box-shadow: 0 0 0 1px rgba(42, 47, 69, 0.16);
  cursor: text;
  outline: none;

  text-align: center;
  vertical-align: middle;

  text-decoration: none;
  word-break: keep-all;
  white-space: nowrap;
  user-select: auto;
`;

interface ObInputProps {
  bytes: number;
  onChange: (string) => void;
}

function ExampleInput({ children, onClick }) {
  return (
    <ExampleLink>
      Example: <a onClick={() => onClick(children)}>{children}</a>
    </ExampleLink>
  );
}

function ObInput({ bytes = 4, onChange }: ObInputProps) {
  if (bytes % 2 !== 0) {
    throw new Error("Expected even number of bytes");
  }

  if (bytes % 4 !== 0) {
    throw new Error("Excepted a multiple of 4 bytes");
  }

  const numSections = bytes / 2;
  const numBlocks = numSections / 2;

  const [values, setValues] = useState(times(numSections, () => ""));
  const refs = useRef(times(numSections, () => createRef<HTMLInputElement>()));

  onChange(`~${values.join("-")}`);

  const onAnyChange = (i: number) => event => {
    const value = event.target.value as string;
    setValues([...values.slice(0, i), value, ...values.slice(i + 1)]);

    if (value.length === kPhonemeLength * kSectionSize) {
      if (i + 1 !== refs.current.length) {
        refs.current[i + 1].current.focus();
      }
    }
  };

  const fillExample = (value: string) => {
    setValues(value.split("-"));
  };

  const blocks = times(numBlocks, (i: number) => {
    const refIndex = i * 2;
    return (
      <Block key={`row-${refIndex}`}>
        <Section>
          <Input
            ref={refs.current[refIndex]}
            value={values[refIndex]}
            onChange={onAnyChange(refIndex)}
          />
        </Section>
        <Hyphen />
        <Section>
          <Input
            ref={refs.current[refIndex + 1]}
            value={values[refIndex + 1]}
            onChange={onAnyChange(refIndex + 1)}
          />
        </Section>
      </Block>
    );
  });

  return (
    <>
      <Container>{blocks}</Container>
      <ExampleInput onClick={fillExample}>
        {blocks.map(() => "bosnyt-raddux").join("-")}
      </ExampleInput>
    </>
  );
}

export default ObInput;
