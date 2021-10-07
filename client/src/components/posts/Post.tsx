import { useState, useContext } from "react";
import styled from "styled-components";

import { IPost } from "../../interfaces";

import Author from "../Author";
import TextArea from "../TextArea";
import UserContext from "../../context/user";
import Comments from "../comments/";
import EditPost from "./EditPost";

type PostProps = {
  post: IPost;
  cacheIndex: number[];
};

const Post = (props: PostProps) => {
  const { post, ...rest } = props;
  const commentCount = post.comments.length;
  const [editing, setEditing] = useState<boolean>(false);
  const [showReplyField, setShowReplyField] = useState<boolean>(false);
  const [count, setCount] = useState<number>(commentCount);

  const { _id, createdBy, createdAt, body: content } = post;
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Author
        username={createdBy.username}
        avatar={createdBy.avatar}
        date={createdAt}
        gap="15px"
        direction="column"
      />
      <Content>
        {editing ? (
          <EditPost setEditing={setEditing} id={_id} content={content} {...rest} />
        ) : (
          <>
            <TextArea limit={200}>{content}</TextArea>
            {user?._id === createdBy._id && (
              <i className="fas fa-pencil-alt" onClick={() => setEditing(true)}></i>
            )}
          </>
        )}
      </Content>
      <Interactions>
        <Like>
          <i className="far fa-heart"></i>
          Like
          <span> 7</span>
        </Like>
        <ReplyBtn onClick={() => setShowReplyField}>
          <span>Comment</span>
          <span>{commentCount}</span>
        </ReplyBtn>
      </Interactions>
      <Comments
        setCount={setCount}
        postId={_id}
        count={count}
        showReplyField={showReplyField}
        setShowReplyField={setShowReplyField}
      />
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

export default Post;
