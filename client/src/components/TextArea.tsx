import { useState } from "react";
import styled from "styled-components";

const TextArea = (props: { children: string; limit: number }) => {
  const text = props.children;
  const [isReadMore, setIsReadMore] = useState(true);

  const handleClick = () => {
    setIsReadMore((prev) => !prev);
  };

  return (
    <Text>
      {isReadMore ? text.slice(0, props.limit) : text}
      <span onClick={handleClick}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </Text>
  );
};

const Text = styled.p`
  span {
    cursor: pointer;
    color: #8224e3;
  }
`;

export default TextArea;
