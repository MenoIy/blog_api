import React from "react";
import styled from "styled-components";

type CommentProps = {
  author: string;
  content: string;
};

const CommentContainer = (props: CommentProps) => {
  const { author, content } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container onClick={handleClick}>
      <AuthorContainer>
        <Avatar>
          <img src="avatar.png" alt="avatar" />
        </Avatar>
        <Author>
          <h1>{author}</h1>
        </Author>
      </AuthorContainer>
      <Content>
        <p>{content}</p>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 60%;
  border-radius: 20px;
  box-shadow: 0px 3px 7px 0px #64405e;
  margin: 15px auto;
  padding: 5px 5px;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 320) {
    width: 90%;
  }
`;

const Content = styled.div`
  margin: 20px;
  word-break: break-all;
  line-height: 20px;
`;
const AuthorContainer = styled.div`
  display: flex;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  padding-bottom: 10px;
`;

const Avatar = styled.div`
  width: 100px;
  img {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const Author = styled.div`
  margin: auto 0px;
  font-size: 10px;
`;

export default CommentContainer;
