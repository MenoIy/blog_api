import React, { SetStateAction } from "react";
import { useQueryClient, useMutation, InfiniteData } from "react-query";
import { useFormik } from "formik";
import styled from "styled-components";

import { api } from "../../api";
import { postSchema } from "../../validators/";
import { FetchPromise } from "./";
import { IPost } from "../../interfaces";

import Button from "../Button";
import EditField from "../EditField";

type UpdateProps = {
  id: number;
  content: string;
};

const updatePost = async ({ id, content }: UpdateProps): Promise<IPost> => {
  return await api
    .patch(`/posts/${id}`, { body: content })
    .then(({ data }: { data: IPost }) => data);
};

type Infinite = InfiniteData<FetchPromise>;

type EditProps = {
  id: number;
  content: string;
  setEditing: React.Dispatch<SetStateAction<boolean>>;
  cacheIndex: number[];
};

const EditPost = ({ id, content, setEditing, cacheIndex }: EditProps) => {
  const queryClient = useQueryClient();
  const queryKey = `fetch Posts`;

  const { mutate } = useMutation(updatePost, {
    onMutate: async () => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<Infinite>(queryKey);
      if (previous) {
        const newCache = { ...previous };
        const toUpdate = newCache.pages[cacheIndex[0]].data[cacheIndex[1]];
        toUpdate.body = content;

        queryClient.setQueryData<Infinite>(queryKey, newCache);
      }
      return previous;
    },
    onError: (error, variables, previous?: Infinite) => {
      if (previous) {
        queryClient.setQueryData<Infinite>(queryKey, previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const formik = useFormik({
    initialValues: { content },
    validationSchema: postSchema,
    onSubmit: ({ content }) => {
      mutate({ id, content });
      setEditing(false);
    },
  });

  return (
    <EditForm onSubmit={formik.handleSubmit}>
      <EditField
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
        hasError={!!formik.errors.content}
      />
      <div>
        <span onClick={() => setEditing(false)}>Cancel</span>
        <Button type="submit" width="90px" height="25px" disabled={!!formik.errors.content}>
          Edit
        </Button>
      </div>
    </EditForm>
  );
};

const EditForm = styled.form`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-direction: column;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-top: 10px;
    margin-left: auto;
  }
  span {
    cursor: pointer;
    color: #8224e3;
    margin-left: auto;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default EditPost;
