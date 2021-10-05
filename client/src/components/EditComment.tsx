import { useQueryClient, useMutation } from "react-query";
import { useFormik } from "formik";
import styled from "styled-components";

import { api } from "../api";
import Button from "./Button";
import { commentSchema } from "../validators/";

import { IComment } from "../interfaces";

const updateComment = async ({ id, content }: { id: number; content: string }) => {
  return await api
    .patch(`/comments/${id}`, { content })
    .then(({ data }: { data: IComment }) => data);
};

type EditProps = {
  id: number;
  postId: number;
  content: string;
  setEditing: (status: boolean) => void;
  cacheIndex: number[];
};

const EditComment = ({ id, postId, content, setEditing, cacheIndex }: EditProps) => {
  const queryClient = useQueryClient();
  const queryKey = `fetch Comments ${postId}`;

  const { mutate } = useMutation(updateComment, {
    onSuccess: async (newComment) => {
      await queryClient.cancelQueries(queryKey);

      queryClient.setQueryData(queryKey, (prev: any) => {
        prev.pages[cacheIndex[0]].data[cacheIndex[1]] = newComment;
        return prev;
      });
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
        borderColor={formik.errors.content ? "#ff0000" : "#8224e3"}
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

const EditField = styled.textarea<{ borderColor: string }>`
  border: 1px solid;
  border-color: ${(props) => (props.borderColor === "#ff0000" ? "#ff0000" : "#e7edf2")};
  border-radius: 10px;
  height: 2.8rem;
  resize: vertical;
  outline: none;
  color: #626c72;
  font-family: inherit;
  margin-left: 3px;
  padding: 10px 20px;
  width: 100%;
  &:focus {
    border-color: ${(props) => props.borderColor};
  }
`;

export default EditComment;
