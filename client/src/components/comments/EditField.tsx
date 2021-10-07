import styled from "styled-components";

const EditField = styled.textarea<{ hasError: boolean }>`
  border: 1px solid;
  border-color: ${(props) => (props.hasError ? "#ff0000" : "#e7edf2")};
  border-radius: 10px;
  height: 3rem;
  font-size: 16px;
  outline: none;
  resize: none;
  color: #626c72;
  font-family: inherit;
  margin-left: 3px;
  padding: 10px 20px;
  width: 100%;

  &:focus {
    border-color: ${(props) => (props.hasError ? "#ff0000" : "#8224e3")};
  }
`;

export default EditField;
