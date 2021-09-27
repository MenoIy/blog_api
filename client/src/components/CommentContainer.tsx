import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import TextArea from "./TextArea";
import PublishDate from "./PublishDate";

type CommentProps = {
  author: string;
  content: string;
  createdAt: Date;
};

const CommentContainer = (props: CommentProps) => {
  const { author, content, createdAt } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Container onClick={handleClick}>
      <AuthorContainer>
        <Avatar img="avatar.png" size={{ width: "30px", height: "30px" }} />
        <Name>
          <a href=".">{author}</a>
        </Name>
        <PublishDate date={createdAt} />
      </AuthorContainer>
      <Content>
        <TextArea limit={100}>{content}</TextArea>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
`;

const Content = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-left: 2rem;
  background: rgba(156, 81, 233, 0.05);
`;

const AuthorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  a {
    text-decoration: none;
    color: #4f515b;
  }
  font-weight: 600;
`;

export default CommentContainer;
