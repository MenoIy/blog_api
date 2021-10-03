import styled from "styled-components";

import Author from "./Author";
import TextArea from "./TextArea";

type CommentProps = {
  author: string;
  content: string;
  createdAt: Date;
  avatar: string;
};

const Comment = (props: CommentProps): JSX.Element => {
  const { author, content, createdAt, avatar } = props;

  return (
    <Container>
      <Author
        username={author}
        avatar={avatar}
        date={createdAt}
        size={{ width: "30px", height: "30px" }}
        gap={"6px"}
      />
      <Content>
        <TextArea limit={100}>{content}</TextArea>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 5px;
  margin-bottom: 15px;
  div {
    margin-top: 5px;
  }
`;

const Content = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-left: 2rem;
  background: rgba(156, 81, 233, 0.05);
`;

export default Comment;
