import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient, InfiniteData } from "react-query";
import { useFormik } from "formik";

import { IPost } from "../../interfaces";
import { api } from "../../api";
import { FetchPromise } from "./";
import { postSchema } from "../../validators/";

import { useUserState } from "../../context/userContext";
import Avatar from "../Avatar";
import Button from "../Button";
import EditField from "../EditField";

type Infinite = InfiniteData<FetchPromise>;

const createPost = async (content: string): Promise<IPost> => {
  return await api.post(`/posts`, { body: content }).then(({ data }: { data: IPost }) => data);
};

const NewPost = () => {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const queryKey = `fetch Posts`;
  const user = useUserState();

  const { mutate } = useMutation(createPost, {
    onMutate: async (body) => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<Infinite>(queryKey);

      if (previous) {
        const newCache = { ...previous };
        const tmpPost: IPost = {
          body: body,
          _id: 0x0,
          createdBy: { _id: user!._id, username: user!.username, avatar: user!.avatar },
          createdAt: new Date(),
          comments: [],
        };
        newCache.pages[0].data = [tmpPost, ...newCache.pages[0].data];
        queryClient.setQueryData(queryKey, newCache);
      }
      return previous;
    },
    onError: (error, variables, previous?: Infinite) => {
      if (previous) {
        queryClient.setQueryData(queryKey, previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
      queryClient.invalidateQueries("auth");
    },
  });

  const formik = useFormik({
    initialValues: { content: "" },
    validationSchema: postSchema,
    onSubmit: ({ content }) => {
      mutate(content);
      setShowButtons(false);
      formik.setValues({ content: "" }, false);
    },
  });

  const handleClose = () => {
    setShowButtons(false);
    formik.setValues({ content: "" }, false);
  };

  return (
    <Container onSubmit={formik.handleSubmit}>
      <FormInput>
        <Avatar avatar={user!.avatar} />
        <EditField
          name="content"
          value={formik.values.content}
          placeholder={`What's new, ?`}
          onChange={formik.handleChange}
          hasError={!!formik.errors.content}
          onClick={() => setShowButtons(true)}
        />
      </FormInput>
      {showButtons && (
        <PostButtons>
          <span onClick={handleClose}>Cancel</span>
          <Button type="submit" width="190px" height="35px">
            Post
          </Button>
        </PostButtons>
      )}
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  margin: 20px 0px;
  padding: 30px 0px;
  flex-direction: column;
  width: 100%;
`;
const FormInput = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
const PostButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 10px;
  margin-left: 35px;
  span {
    cursor: pointer;
    color: #8224e3;
    margin-left: auto;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default NewPost;
