import React, { SetStateAction, useContext, useRef, useEffect } from "react";
import { useMutation, useQueryClient, InfiniteData } from "react-query";
import { useFormik } from "formik";
import styled from "styled-components";

import { api } from "../../api";
import { IComment } from "../../interfaces";
import { FetchPromise } from "./";
import { commentSchema } from "../../validators";

import UserContext from "../../context/user";
import Avatar from "../Avatar";
import Button from "../Button";

type CreateProps = {
  postId: number;
  content: string;
};

type NewCommentProps = {
  postId: number;
  setCount: React.Dispatch<SetStateAction<number>>;
  setShowReplyField: React.Dispatch<SetStateAction<boolean>>;
};

type Infinite = InfiniteData<FetchPromise>;

const createComment = async ({ postId, content }: CreateProps): Promise<IComment> => {
  return await api
    .post(`/posts/${postId}/comments`, { content })
    .then(({ data }: { data: IComment }) => data);
};

const NewComment = (props: NewCommentProps) => {
  const { postId, setCount, setShowReplyField } = props;
  const queryClient = useQueryClient();
  const queryKey = `fetch Comments ${postId}`;
  const { user } = useContext(UserContext);
  const ref = useRef<HTMLTextAreaElement>(null);

  const { mutate } = useMutation(createComment, {
    onMutate: async ({ content }) => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<Infinite>(queryKey);

      if (previous && user) {
        const newCache = { ...previous };
        newCache.pages[0].data.push({
          content: content,
          _id: 0x0,
          createdBy: { _id: user._id, username: user.username, avatar: user.avatar },
          createdAt: new Date(),
        });

        queryClient.setQueryData<Infinite>(queryKey, newCache);
      }
      return previous;
    },
    onError: (error, variables, previous?: Infinite) => {
      if (previous) queryClient.setQueryData<Infinite>(queryKey, previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: commentSchema,
    onSubmit: ({ content }) => {
      mutate({ postId, content });
      formik.setValues({ content: "" });
      setShowReplyField(false);
    },
  });

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.height = "0px";
    const scrollheight = ref.current.scrollHeight;
    ref.current.style.height = `${scrollheight}px`;
  }, [formik.values.content]);

  return (
    <ReplyField onSubmit={formik.handleSubmit}>
      <ReplyInput hasError={!!formik.errors.content}>
        <Avatar avatar={user!.avatar} size={{ width: "30px", height: "30px" }} />
        <TextField
          ref={ref}
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          hasError={!!formik.errors.content}
        />
      </ReplyInput>
      <ReplyButtons>
        <span onClick={() => setShowReplyField(false)}>Cancel</span>
        <Button type="submit" width="90px" height="25px">
          Reply
        </Button>
      </ReplyButtons>
    </ReplyField>
  );
};

const TextField = styled.textarea<{ hasError: boolean }>`
  border: 1px solid;
  border-color: ${(props) => (props.hasError ? "#ff0000" : "#e7edf2")};
  border-radius: 10px;
  min-height: 1.8rem;
  font-size: 16px;
  outline: none;
  color: #626c72;
  font-family: inherit;
  margin-left: 3px;
  padding: 10px 20px;
  width: 100%;

  &:focus {
    border-color: ${(props) => (props.hasError ? "#ff0000" : "#8224e3")};
  }
`;

const ReplyField = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ReplyInput = styled.div<{ hasError: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ReplyButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
  margin-left: 45px;

  span {
    cursor: pointer;
    color: #8224e3;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default NewComment;
