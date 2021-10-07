import React, { SetStateAction } from "react";
import { useQueryClient, useMutation, InfiniteData } from "react-query";
import { useFormik } from "formik";
import styled from "styled-components";

import { api } from "../../api";
import { commentSchema } from "../../validators/";
import { FetchPromise } from "./";
import { IComment } from "../../interfaces";

import Button from "../Button";
import EditField from "./EditField";

type UpdateProps = {
  id: number;
  content: string;
};

const updateComment = async ({ id, content }: UpdateProps): Promise<IComment> => {
  return await api
    .patch(`/comments/${id}`, { content })
    .then(({ data }: { data: IComment }) => data);
};

type Infinite = InfiniteData<FetchPromise>;

type EditProps = {
  id: number;
  postId: number;
  content: string;
  setEditing: React.Dispatch<SetStateAction<boolean>>;
  cacheIndex: number[];
};

const EditComment = ({ id, postId, content, setEditing, cacheIndex }: EditProps) => {
  const queryClient = useQueryClient();
  const queryKey = `fetch Comments ${postId}`;

  const { mutate } = useMutation(updateComment, {
    onMutate: async ({ content }) => {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData<Infinite>(queryKey);

      if (previous) {
        const newCache = { ...previous };
        const toUpdate = newCache.pages[cacheIndex[0]].data[cacheIndex[1]];
        toUpdate.content = content;

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
    initialValues: { content },
    validationSchema: commentSchema,
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
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    gap: 30px;
    margin-top: 10px;
    width: 100%;
  }
  span {
    margin-left: auto;
    cursor: pointer;
    color: #8224e3;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default EditComment;
