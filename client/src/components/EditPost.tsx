import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";

import { api } from "../api";
import Button from "./Button";

import { IPost } from "../interfaces/";

const updatePost = async ({ id, body }: { id: number; body: string }): Promise<IPost> => {
  return await api.patch(`/posts/${id}`, { body }).then(({ data }: { data: IPost }) => data);
};

type EditProps = {
  id: number;
  content: string;
  setEditing: (status: boolean) => void;
  cacheIndex: number[];
};

const EditPost = ({ id, content, setEditing, cacheIndex }: EditProps) => {
  const queryKey = "fetch Posts";
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updatePost, {
    onSuccess: async (newPost) => {
      await queryClient.cancelQueries(queryKey);

      queryClient.setQueryData(queryKey, (prev: any) => {
        prev.pages[cacheIndex[0]].data[cacheIndex[1]] = newPost;
        return prev;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const formik = useFormik({
    initialValues: { body: content },
    onSubmit: ({ body }) => {
      mutate({ id, body });
      setEditing(false);
    },
  });

  return (
    <EditForm onSubmit={formik.handleSubmit}>
      <textarea name="body" value={formik.values.body} onChange={formik.handleChange} />
      <div>
        <span onClick={() => setEditing(false)}>Cancel</span>
        <Button type="submit" width="90px" height="25px">
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
  textarea {
    border: 1px solid #e7edf2;
    border-radius: 50px;
    height: 2.8rem;
    resize: vertical;
    font-size: 14px;
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
