import { useState, useContext } from "react";
import styled from "styled-components";
import dotenv from "dotenv";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import Author from "./Author";
import TextArea from "./TextArea";
import EditComment from "./EditComment";
import UserContext from "../context/user";

type CommentProps = {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
  avatar: string;
  postId: number;
  index: number[];
};

dotenv.config();

const Comment = (props: CommentProps): JSX.Element => {
  const { author, content, createdAt, avatar } = props;
  const [editing, setEditing] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  return (
    <Container>
      <Author
        username={author}
        avatar={avatar ? `${process.env.REACT_APP_API || ""}${avatar}` : ""}
        date={createdAt}
        size={{ width: "30px", height: "30px" }}
        gap={"6px"}
      />
      <Content>
        {editing ? (
          <EditComment
            id={props.id}
            postId={props.postId}
            cacheIndex={props.index}
            setEditing={setEditing}
            content={content}
          />
        ) : (
          <>
            <TextArea limit={100}>{content}</TextArea>
            {user && <i className="fas fa-pencil-alt" onClick={() => setEditing(true)}></i>}
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
