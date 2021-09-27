import styled from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "./Avatar";
import TextArea from "./TextArea";

type PostProps = {
  className?: string;
  id: "string";
  content: string;
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
      <Author>
        <Avatar img="avatar.png"></Avatar>
        <Body>
          <Name>
            <a href=".">{props.author}</a>
          </Name>
          <PublishDate>{getElapsedTime()}</PublishDate>
        </Body>
      </Author>
      <Content>
        <TextArea>{props.content}</TextArea>
      </Content>
      <Interaction>
        <Like>
          <i className="far fa-heart"></i>
          Like
          <span> 7</span>
        </Like>
        <Comment>
          <span>Comment</span>
          <span>{props.comments.length}</span>
        </Comment>
      </Interaction>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  line-height: 24px;
  flex-direction: column;
`;

const Author = styled.div`
  display: flex;
`;

const Body = styled.div`
  margin-left: 15px;
`;

const Name = styled.div`
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
  @media (min-width: 767.98px) {
    margin-left: 50px;
  }
`;

const Interaction = styled.div`
  margin-top: 1.6rem;
  display: flex;
  border-top: 1px solid #e7edf2;
  border-bottom: 1px solid #e7edf2;
  padding: 1rem;
  @media (min-width: 767.98px) {
    margin-left: 50px;
  }
`;

const Comment = styled.div`
  cursor: pointer;
  white-space: nowrap;
  color: #838daa;
  font-weight: normal;
  line-height: 1.5;
  span {
    margin-right: 5px;
  }
  span:nth-child(2) {
    border: 1px solid #e7edf2;
    border-radius: 50px;
    padding: 0 6px;
  }
`;

const Like = styled.div`
  cursor: pointer;
  margin-right: 50px;
  color: #8224e3;
  font-weight: normal;
  line-height: 1.5;
  i {
    margin-right: 5px;
  }
  span {
    margin-left: 5px;
  }
`;

export default PostContainer;
