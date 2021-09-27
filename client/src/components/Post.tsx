import styled from "styled-components";

import Avatar from "./Avatar";
import TextArea from "./TextArea";
import Comments from "./Comments";
import PublishDate from "./PublishDate";

type PostProps = {
  className?: string;
  id: "string";
  content: string;
  comments: Array<String>;
  author: string;
  date: Date;
  setPost: (id: string) => void;
};

const Post = (props: PostProps) => {
  //
  return (
    <Container className={props.className}>
      <Author>
        <Avatar img="avatar.png"></Avatar>
        <Body>
          <Name>
            <a href=".">{props.author}</a>
          </Name>
          <PublishDate date={props.date} />
        </Body>
      </Author>
      <Content>
        <TextArea limit={200}>{props.content}</TextArea>
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
      {props.comments.length > 0 && (
        <Comments id={props.id} count={props.comments.length}></Comments>
      )}
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
  align-items: center;
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

const Content = styled.div`
  word-break: break-all;
  margin-top: 20px;
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

export default Post;
