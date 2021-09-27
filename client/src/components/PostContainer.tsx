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
          <span className="far fa-heart"> 6</span>
        </Like>
        <Button>
          <span className="far fa-comments">{` ${props.comments.length} Comments`}</span>
        </Button>
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
  cursor: pointer;
  display: flex;
  @media (min-width: 767.98px) {
    margin-left: 50px;
  }
  span {
    color: #8224e3;
    font-size: 16px;
    line-height: 1;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  white-space: nowrap;
`;

const Like = styled.div`
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PostContainer;
