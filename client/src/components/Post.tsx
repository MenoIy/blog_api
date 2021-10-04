import { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import dotenv from "dotenv";

import Author from "./Author";
import TextArea from "./TextArea";
import Comments from "./Comments";
import UserContext from "../context/user";
import { api } from "../api";

import { IPost } from "../interfaces/";

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

const updatePost = async ({ id, body }: { id: number; body: string }): Promise<IPost> => {
  return await api.patch(`/posts/${id}`, { body }).then(({ data }) => data);
};

const Post = (props: PostProps): JSX.Element => {
  //
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
    console.log("set to true");
    setEditing(true);
  };
  //

  return (
    <Container>
      <Author
        username={author}
        avatar={avatar ? `${process.env.REACT_APP_API || ""}${avatar}` : ""}
        date={date}
        gap="15px"
        direction="column"
      />

      <Content>
        {editing ? (
          <EditPost setEditing={setEditing} content={content} id={props.id} index={props.index} />
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
        ref={replyFieldRef}
        {...replyProps}
        showReplyField={showReplyField}
        setShowReplyField={setShowReplyField}
      ></Comments>
    </Container>
  );
};

type EditProps = {
  setEditing: (status: boolean) => void;
  content: string;
  id: number;
  index: number[];
};

const EditPost = (props: EditProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updatePost, {
    onSuccess: async (newPost) => {
      await queryClient.cancelQueries("fetch Posts");
      queryClient.setQueriesData("fetch Posts", (prev: any) => {
        prev.pages[props.index[0]].data[props.index[1]] = newPost;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("fetch Posts");
    },
  });

  const formik = useFormik({
    initialValues: { body: props.content },
    onSubmit: ({ body }) => mutate({ id: props.id, body }),
  });

  return (
    <Edit onSubmit={formik.handleSubmit}>
      <textarea name="body" value={formik.values.body} onChange={formik.handleChange} />
      <Buttons>
        <CancelButton onClick={() => props.setEditing(false)}> Cancel </CancelButton>
        <EditButton type="submit"> Edit</EditButton>
      </Buttons>
    </Edit>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  line-height: 24px;
  flex-direction: column;
`;

const Edit = styled.form`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
  margin-left: auto;
`;

const EditButton = styled.button`
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
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
`;

export default Post;
