import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Author from "./Author";
import TextArea from "./TextArea";
import Comments from "./Comments";

type PostProps = {
  id: number;
  content: string;
  repliesCount: number;
  author: string;
  avatar: string;
  date: Date;
};

const Post = (props: PostProps): JSX.Element => {
  //
  const [showReplyField, setShowReplyField] = useState<boolean>(false);
  const { content, author, date, avatar, ...replyProps } = props;
  const replyFieldRef = useRef<HTMLTextAreaElement>(null);

  //

  useEffect(() => {
    if (showReplyField === true) {
      replyFieldRef.current?.focus();
    }
  }, [showReplyField]);

  const handleClick = () => {
    setShowReplyField(true);
    replyFieldRef.current?.focus();
  };
  //

  return (
    <Container>
      <Author username={author} avatar={avatar} date={date} gap="15px" direction="column" />

      <Content>
        <TextArea limit={200}>{content}</TextArea>
      </Content>

      <Interactions>
        <Like>
          <i className="far fa-heart"></i>
          Like
          <span> 7</span>
        </Like>
        <ReplyBtn onClick={handleClick}>
          <span>Comment</span>
          <span>{replyProps.repliesCount}</span>
        </ReplyBtn>
      </Interactions>

      <Comments
        ref={replyFieldRef}
        {...replyProps}
        showReplyField={showReplyField}
        setShowReplyField={setShowReplyField}
      ></Comments>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  line-height: 24px;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 20px;
  @media (min-width: 767.98px) {
    margin-left: 50px;
  }
`;

const Interactions = styled.div`
  margin-top: 1.6rem;
  display: flex;
  border-top: 1px solid #e7edf2;
  border-bottom: 1px solid #e7edf2;
  padding: 0.8rem 0.5rem;
  @media (min-width: 767.98px) {
    margin-left: 50px;
  }
`;

const ReplyBtn = styled.div`
  cursor: pointer;
  color: #838daa;
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
  i {
    margin-right: 5px;
  }
  span {
    margin-left: 5px;
  }
`;

export default Post;
