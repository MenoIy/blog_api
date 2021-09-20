import styled from "styled-components";

import React from "react";

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

type FieldProps = {
  name: string;
  type: string;
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
  error?: string;
  touched?: boolean;
};

const Field = ({
  name,
  type,
  handleChange,
  value,
  error,
  touched,
}: FieldProps) => {
  return (
    <>
      <label>{name}</label>
      <Input name={name} type={type} onChange={handleChange} value={value} />
      {error && touched && <Error>{error}</Error>}
    </>
  );
};

export default Field;
