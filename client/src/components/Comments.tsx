import { useState, forwardRef, useContext } from "react";
import styled from "styled-components";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";

import { commentSchema } from "../validators";
import { IComment } from "../interfaces";
import UserContext from "../context/user";

import { api } from "../api";

import Avatar from "./Avatar";
import Comment from "./Comment";

//fetch all comments
const useFetchComments = (id: number, limit: number) => {
  const fetchComment = async (): Promise<IComment[]> => {
    return await api
      .get(`/posts/${id}/comments?limit=${limit}`)
      .then(({ data }: { data: IComment[] }) => data.reverse());
  };

  return useQuery(["fetchComments", { id, limit }], fetchComment);
};

// create new comment
const createComment = async (args: { id: number; content: string }): Promise<IComment> => {
  const { id, content } = args;
  return await api
    .post(`/posts/${id}/comments`, { content })
    .then(({ data }: { data: IComment }) => data);
};

type CommentsProps = {
  id: number;
  repliesCount: number;
  showReplyField: boolean;
  setShowReplyField: (showFied: boolean) => void;
};

const Comments = forwardRef<HTMLTextAreaElement, CommentsProps>((props, ref): JSX.Element => {
  //
  const [showAll, setShowAll] = useState<boolean>(props.repliesCount > 3);
  const limit = showAll ? 3 : 0;
  const { data, isLoading, isError } = useFetchComments(props.id, limit);
  const context = useContext(UserContext);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(createComment, {
    onSuccess: async (newComment) => {
      await queryClient.cancelQueries(["fetchComments", { id: props.id, limit }]);

      queryClient.setQueriesData(["fetchComments", { id: props.id, limit }], (prev: any) => [
        ...prev,
        newComment,
      ]);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["fetchComments", { id: props.id, limit }]);
    },
  });

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: commentSchema,
    onSubmit: (values: { content: string }) => {
      mutate({ id: props.id, content: values.content });
      formik.setValues({ content: "" });
    },
  });

  //

  const handleClick = () => {
    setShowAll((prev) => !prev);
  };

  const closeReplyField = () => {
    props.setShowReplyField(false);
  };

  //
  if (isError) return <h1>Error</h1>;

  return (
    <Container>
      {showAll && props.repliesCount > 3 && (
        <ShowMore onClick={handleClick}>
          <span className="fa fa-eye">{` Show all ${props.repliesCount} comments`} </span>
        </ShowMore>
      )}
      {isLoading && <Loading>Loading Comments</Loading>}
      {data &&
        data.map((comment: any) => (
          <Comment
            key={comment._id}
            author={comment.createdBy.username}
            avatar={comment.createdBy.avatar}
            createdAt={comment.createdAt}
            content={comment.content}
          ></Comment>
        ))}

      {props.showReplyField && (
        <ReplyField onSubmit={formik.handleSubmit}>
          <ReplyInput>
            <Avatar
              img={context.user?.avatar || "avatar.png"}
              size={{ width: "30px", height: "30px" }}
            />
            <textarea
              ref={ref}
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            />
          </ReplyInput>
          <Buttons>
            <PostButton type="submit">Post</PostButton>
            <CancelButton onClick={closeReplyField}>Cancel</CancelButton>
          </Buttons>
        </ReplyField>
      )}
    </Container>
  );
});

const Container = styled.div`
  margin-left: 3rem;

  @media (max-width: 767.98px) {
    margin-left: 0;
  }
`;

const ShowMore = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: #8224e3;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const ReplyField = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ReplyInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
  margin-left: 35px;
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

export default Comments;
