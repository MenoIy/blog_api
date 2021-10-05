import { useState, useContext } from "react";
import styled from "styled-components";
import dotenv from "dotenv";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import Author from "./Author";
import TextArea from "./TextArea";
import UserContext from "../context/user";

import { IComment } from "../interfaces";
import { api } from "../api";

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

const updateComment = async ({ id, content }: { id: number; content: string }) => {
  return await api
    .patch(`/comments/${id}`, { content })
    .then(({ data }: { data: IComment }) => data);
};

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
            index={props.index}
            setEditing={setEditing}
            content={content}
            postId={props.postId}
            id={props.id}
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

type EditProps = {
  setEditing: (status: boolean) => void;
  postId: number;
  content: string;
  index: number[];
  id: number;
};

const EditComment = (props: EditProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateComment, {
    onSuccess: async (newComment) => {
      await queryClient.cancelQueries(`fetch Comments ${props.postId}`);
      queryClient.setQueriesData(`fetch Comments ${props.postId}`, (prev: any) => {
        prev.pages[props.index[0]].data[props.index[1]] = newComment;
        return prev;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(`fetch Comments ${props.postId}`);
    },
  });

  const formik = useFormik({
    initialValues: { content: props.content },
    onSubmit: ({ content }) => {
      mutate({ id: props.id, content });
      props.setEditing(false);
    },
  });

  return (
    <Edit onSubmit={formik.handleSubmit}>
      <textarea
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
      ></textarea>
      <Buttons>
        <CancelButton onClick={() => props.setEditing(false)}>Cancel</CancelButton>
        <PostButton type="submit">Edit</PostButton>
      </Buttons>
    </Edit>
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

const Edit = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  textarea {
    border: 1px solid #e7edf2;
    border-radius: 50px;
    height: 2.8rem;
    resize: vertical;
    font-size: 16px;
    outline: none;
    color: #626c72;
    font-family: inherit;
    margin-left: 3px;
    padding: 10px 20px;
    width: 100%;
  }
  textarea:focus {
    border-color: #8224e3;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
  margin-left: auto;
`;

const PostButton = styled.button`
  border-radius: 50px;
  cursor: pointer;
  border: none;
  width: 91px;
  height: 25px;
  background-color: #8e4ad1;
  background-size: 0% 100%;
  box-shadow: 0 1px 2px 0 rgb(130 36 227 / 50%);
  color: white;
  &:hover {
    background-color: #6bc3ef;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.7) 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    background-color: #a968ec;
    transition: background-color 1s, background-size 0.75s;
  }
`;

const CancelButton = styled.div`
  cursor: pointer;
  color: #8224e3;
  &:hover {
    text-decoration: underline;
  }
`;

const Loading = styled.div`
  cursor: pointer;
  color: #8224e3;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

export default Comment;
