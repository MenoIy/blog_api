import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { useFormik } from "formik";

import { api } from "../api/";
import { IPost } from "../interfaces";
import Avatar from "./Avatar";

import Post from "./Post";

const fetchPosts = async ({ pageParam = 0 }) => {
  const offset = pageParam * 10;
  return await api.get(`/posts?offset=${offset}`).then(({ data }: { data: IPost[] }) => {
    return {
      data: data,
      nextPage: pageParam + 1,
    };
  });
};

const createPost = async (body: string): Promise<IPost> => {
  return await api.post(`/posts`, { body }).then(({ data }: { data: IPost }) => data);
};

const Posts = (props: { username?: string }) => {
  //
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createPost, {
    onSuccess: async (newPost) => {
      await queryClient.cancelQueries("fetch Posts");
      queryClient.setQueriesData("fetch Posts", (prev: any) => {
        prev.pages[0].data = [newPost, ...prev.pages[0].data];
        return { ...prev };
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("fetch Posts");
    },
  });

  const formik = useFormik({
    initialValues: { body: "" },
    onSubmit: (values: { body: string }) => {
      mutate(values.body);
      formik.setValues({ body: "" });
    },
  });

  return (
    <Container>
      <Body>
        <PostForm onSubmit={formik.handleSubmit}>
          <FormInput>
            <Avatar img="avatar.png" />
            <textarea
              name="body"
              value={formik.values.body}
              placeholder={`What's new, ?`}
              onChange={formik.handleChange}
            />
          </FormInput>
          <Buttons>
            <CancelButton onClick={() => formik.setValues({ body: "" })}>Cancel</CancelButton>
            <PostButton type="submit">Post</PostButton>
          </Buttons>
        </PostForm>
        <ShowPosts />
      </Body>
    </Container>
  );
};

const ShowPosts = React.memo(() => {
  const [loading, setLoading] = useState(true);
  const { status, ...infiniteQuery } = useInfiniteQuery("fetch Posts", fetchPosts, {
    getNextPageParam: (data) => data.nextPage,
  });

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        infiniteQuery.fetchNextPage();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (status === "error") return <h1>khorda</h1>;

  return (
    <>
      {status === "success" &&
        infiniteQuery.data?.pages.map((group, index) => (
          <div key={index}>
            {group.data.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                author={post.createdBy.username}
                date={post.createdAt}
                content={post.body}
                repliesCount={post.comments.length}
              />
            ))}
          </div>
        ))}
      {loading && <Loading>Loading more</Loading>}
    </>
  );
});

const Container = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 100%;
  flex: 66.6666%;

  @media screen and (min-width: 767.98px) {
    &::before {
      content: "";
      display: block;
      background: #e7edf2;
      width: 2px;
      height: calc(100% - 40px);
      position: absolute;
      left: 79px;
      top: 40px;
      z-index: -1;
      opacity: 0.7;
    }
  }
  @media (min-width: 1024px) {
    max-width: 66.666667%;
  }
  transition: max-width 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

const PostForm = styled.form`
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

const Body = styled.div`
  padding: 30px 40px 70px 40px;
  min-height: 100vh;

  @media (max-width: 767.98px) {
    padding: 30px 0 70px 0;
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
  width: 191px;
  height: 35px;
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

const Loading = styled.div`
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  color: #8224e3;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export default Posts;
