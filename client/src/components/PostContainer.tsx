import styled from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";

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
      <Avatar>
        <img src="avatar.png" alt="avatar" />
      </Avatar>
      <Body>
        <Author>
          <a href=".">{props.author}</a>
        </Author>
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
  font-family: "Nunito Sans", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 26px;
`;

const Body = styled.div`
  margin-left: 15px;
`;

const Avatar = styled.div`
  margin-top: 5px;
  img {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const Author = styled.div`
  font-weight: 600;
  a {
    text-decoration: none;
    color: black;
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
