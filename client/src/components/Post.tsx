import { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import dotenv from "dotenv";

import Author from "./Author";
import TextArea from "./TextArea";
import Comments from "./comments/";
import UserContext from "../context/user";

import EditPost from "./EditPost";
dotenv.config();

type PostProps = {
  id: number;
  content: string;
  repliesCount: number;
  author: string;
  avatar: string;
  date: Date;
  index: number[];
};

const Post = (props: PostProps): JSX.Element => {
  //
  const [_, setCount] = useState<number>(0);
  const { content, author, date, avatar, ...replyProps } = props;

  const [editing, setEditing] = useState<boolean>(false);
  const [showReplyField, setShowReplyField] = useState<boolean>(false);
  const replyFieldRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useContext(UserContext);
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

  const handleEditPost = () => {
    setEditing(true);
  };
  //

  return (
    <Container>
      <Author username={author} avatar={avatar || ""} date={date} gap="15px" direction="column" />

      <Content>
        {editing ? (
          <EditPost
            setEditing={setEditing}
            content={content}
            id={props.id}
            cacheIndex={props.index}
          />
        ) : (
          <>
            <TextArea limit={200}>{content}</TextArea>
            {user && <i className="fas fa-pencil-alt" onClick={handleEditPost}></i>}
          </>
        )}
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
        setCount={setCount}
        postId={replyProps.id}
        count={replyProps.repliesCount}
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
  align-items: center;
  display: flex;
  @media (min-width: 767.98px) {
    margin-left: 50px;
  }
  i {
    margin-top: auto;
    margin-left: 7px;
    cursor: pointer;
    color: #d7dae6;
  }
  i:hover {
    color: #8224e3;
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
