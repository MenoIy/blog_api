import React, { SetStateAction } from "react";
import { useMutation, useQueryClient, InfiniteData } from "react-query";
import { useFormik } from "formik";
import styled from "styled-components";

import { api } from "../../api";
import { IComment } from "../../interfaces";
import { FetchPromise } from "./";
import { commentSchema } from "../../validators";

import { useUserState } from "../../context/userContext";
import Avatar from "../Avatar";
import Button from "../Button";
import EditField from "../EditField";

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

const NewComment = React.forwardRef<HTMLTextAreaElement, NewCommentProps>((props, ref) => {
  const { postId, setCount, setShowReplyField } = props;
  const queryClient = useQueryClient();
  const queryKey = `fetch Comments ${postId}`;
  const user = useUserState();

  const { mutate } = useMutation(createComment, {
    onMutate: async ({ content }) => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<Infinite>(queryKey);

      if (previous) {
        const newCache = { ...previous };
        newCache.pages[0].data.push({
          content: content,
          _id: 0x0,
          createdBy: { _id: user!._id, username: user!.username, avatar: user!.avatar },
          createdAt: new Date(),
        });
        setCount((prev) => prev + 1);
        queryClient.setQueryData<Infinite>(queryKey, newCache);
      }
      return previous;
    },
    onError: (error, variables, previous?: Infinite) => {
      if (previous) {
        queryClient.setQueryData<Infinite>(queryKey, previous);
        setCount((prev) => prev - 1);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
      queryClient.invalidateQueries(`auth`);
    },
  });

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: commentSchema,
    onSubmit: ({ content }) => {
      mutate({ postId, content });
      formik.setValues({ content: "" }, false);
    },
  });

  return (
    <ReplyField onSubmit={formik.handleSubmit}>
      <ReplyInput>
        <Avatar avatar={user!.avatar} size={{ width: "30px", height: "30px" }} />
        <EditField
          ref={ref}
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          hasError={!!formik.errors.content}
        />
      </ReplyInput>
      <ReplyButtons>
        <span onClick={() => setShowReplyField(false)}>Cancel</span>
        <Button type="submit" width="90px" height="25px" disabled={!!formik.errors.content}>
          Reply
        </Button>
      </ReplyButtons>
    </ReplyField>
  );
});

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
