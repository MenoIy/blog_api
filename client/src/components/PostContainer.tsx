import styled from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "./Avatar";

type PostProps = {
  className?: string;
  id: "string";
  content: Array<string>;
  comments: Array<String>;
  author: string;
  date: Date;
  setPost: (id: string) => void;
};

const PostContainer = (props: PostProps) => {
  //
  const getElapsedTime = () => {
    return formatDistanceToNowStrict(new Date(props.date), {
      addSuffix: true,
    });
  };

  //
  return (
    <Container className={props.className}>
      <Avatar img="avatar.png"></Avatar>
      <Body>
        <User>
          <a href=".">{props.author}</a>
        </User>
        <PublishDate>{getElapsedTime()}</PublishDate>
        <Content>
          <p>{props.content}</p>
        </Content>
      </Body>
      {/* <PostElements>
        <Comment
          onClick={() => {
            props.setPost(props.id);
          }}
        >
          <span className="far fa-comment"></span>
          <h1>{props.comments.length}</h1>
        </Comment>
      </PostElements> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  line-height: 26px;
`;

const Body = styled.div`
  margin-left: 15px;
`;

const User = styled.div`
  font-weight: 600;
  a {
    text-decoration: none;
    color: #4f515b;
  }
`;

const PublishDate = styled.div`
  font-size: 90%;
  color: rgba(100, 100, 100, 0.5);
  margin-bottom: 20px;
`;

const Content = styled.div`
  word-break: break-all;
`;

export default PostContainer;
