import styled from "styled-components";

type ButtonProps = {
  width: string;
  height: string;
};

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  border-radius: 50px;
  border: none;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #8e4ad1;
  background-size: 0% 100%;
  box-shadow: 0 1px 2px 0 rgb(130 36 227 / 50%);
  color: white;
  &:hover {
    background-color: #6bc3ef;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.7) 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-color: #a968ec;
    transition: background-color 1s, background-size 0.75s;
  }
`;

export default Button;
