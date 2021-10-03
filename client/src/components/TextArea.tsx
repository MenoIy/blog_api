import { useState } from "react";
import styled from "styled-components";

type textAreaProps = {
  children: string;
  limit: number;
};

const TextArea = (props: textAreaProps): JSX.Element => {
  const [isReadMore, setIsReadMore] = useState(true);

  const text = props.children;

  const handleClick = () => {
    setIsReadMore((prev) => !prev);
  };

  const readMore: string = isReadMore ? "...read more" : " show less";
  return (
    <Text>
      {isReadMore ? text.slice(0, props.limit) : text}
      <span onClick={handleClick}>{text.length <= props.limit ? "" : readMore}</span>
    </Text>
  );
};

const Text = styled.p`
  span {
    cursor: pointer;
    color: #8224e3;
  }
  word-break: break-all;
`;

export default TextArea;
