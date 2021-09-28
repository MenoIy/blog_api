import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import TextArea from "./TextArea";
import PublishDate from "./PublishDate";

type CommentProps = {
  author: string;
  content: string;
  createdAt: Date;
};

const Comment = (props: CommentProps): JSX.Element => {
  //
  const { author, content, createdAt } = props;

  //
  return (
    <Container>
      <Author>
        <Link to={{ pathname: `/${author}` }}>
          <Avatar img="avatar.png" size={{ width: "30px", height: "30px" }} />
        </Link>
        <Link to={{ pathname: `/${author}` }}>{author}</Link>
        <PublishDate date={createdAt} />
      </Author>
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

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  a {
    display: block;
    text-decoration: none;
    color: #4f515b;
    font-weight: 600;
    line-height: 40px;
  }
`;

export default Comment;
