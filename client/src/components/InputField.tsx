import styled from "styled-components";

import React from "react";

const Title = styled.label`
  margin-bottom: 5px;
  font-size: 15px;
  margin-top: 15px;
  font-weight: 500;
`;

const Input = styled.input`
  font-size: 16px;
  font-weight: 400;
  padding: 8px 16px;
  min-height: 26px;
  border-radius: 5px;
  border: solid 1px;
  outline: unset;
  border-color: #d2d2d2;
  &:focus {
    border-color: #dc2068;
  }
`;

const Error = styled.div`
  color: red;
  margin-top: 3px;
  font-size: 13px;
`;

type InputFieldProps = {
  name: string;
  type: string;
  label: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
  error?: string;
  touched?: boolean;
};

const InputField = (props: InputFieldProps) => {
  return (
    <>
      <Title>{props.label}</Title>
      <Input
        name={props.name}
        type={props.type}
        onChange={props.handleChange}
        value={props.value}
      />
      {props.error && props.touched && <Error>{props.error}</Error>}
    </>
  );
};

export default InputField;
