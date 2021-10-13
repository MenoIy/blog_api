import { useState, useContext } from "react";
import styled from "styled-components";

import Author from "../Author";
import TextArea from "../TextArea";
import { useUserState } from "../../context/userContext";
import EditComment from "./EditComment";
import { IComment } from "../../interfaces";

type CommentProps = {
  postId: number;
  comment: IComment;
  cacheIndex: number[];
};

const Comment = (props: CommentProps) => {
  const { comment, ...rest } = props;
  const { _id, createdBy, createdAt, content } = comment;
  const [editing, setEditing] = useState<boolean>(false);

  const user = useUserState();

  return (
    <Container>
      <Author
        username={createdBy.username}
        avatar={createdBy.avatar}
        date={createdAt}
        size={{ width: "30px", height: "30px" }}
        gap="6px"
      />
      <Content>
        {editing ? (
          <EditComment setEditing={setEditing} id={_id} content={content} {...rest} />
        ) : (
          <>
            <TextArea limit={100}>{content}</TextArea>
            {user?._id === createdBy._id && (
              <i className="fas fa-pencil-alt" onClick={() => setEditing(true)}></i>
            )}
          </>
        )}
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
  display: flex;
  align-items: center;
  i {
    margin-left: 7px;
    cursor: pointer;
    color: #d7dae6;
  }
  i:hover {
    color: #8224e3;
  }
`;

export default Comment;
