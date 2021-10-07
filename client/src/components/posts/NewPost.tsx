import { useContext } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient, InfiniteData } from "react-query";
import { useFormik } from "formik";

import { IPost } from "../../interfaces";
import { api } from "../../api";
import { FetchPromise } from "./";
import { postSchema } from "../../validators/";

import UserContext from "../../context/user";
import Avatar from "../Avatar";
import Button from "../Button";

type Infinite = InfiniteData<FetchPromise>;

const createPost = async (body: string): Promise<IPost> => {
  return await api.post(`/posts`, { body }).then(({ data }: { data: IPost }) => data);
};

const NewPost = () => {
  const queryClient = useQueryClient();
  const queryKey = `fetch Posts`;
  const { user } = useContext(UserContext);

  const { mutate } = useMutation(createPost, {
    onMutate: async (body) => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<Infinite>(queryKey);

      if (previous && user) {
        const newCache = { ...previous };
        const tmpPost: IPost = {
          body: body,
          _id: 0x0,
          createdBy: { _id: user._id, username: user.username, avatar: user.avatar },
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
    },
  });

  const formik = useFormik({
    initialValues: { body: "" },
    validationSchema: postSchema,
    onSubmit: ({ body }) => {
      mutate(body);
      formik.setValues({ body: "" });
    },
  });

  return (
    <Container onSubmit={formik.handleSubmit}>
      <FormInput>
        <Avatar avatar={user!.avatar} />
        <textarea
          name="body"
          value={formik.values.body}
          placeholder={`What's new, ?`}
          onChange={formik.handleChange}
        />
      </FormInput>
      <PostButtons>
        <span onClick={() => formik.setValues({ body: "" })}>Cancel</span>
        <Button type="submit" width="190px" height="35px">
          Post
        </Button>
      </PostButtons>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  margin-top: 20px;
  padding: 30px 0px;
  flex-direction: column;
  width: 100%;
`;
const FormInput = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
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
