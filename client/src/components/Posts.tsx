import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getPosts } from "../api/";
import Comments from "./Comments";
import Loading from "./Loading";
import PostContainer from "./PostContainer";

const Posts = (props: { username?: string }) => {
  const [selectedPost, setSelectedPost] = useState<string>("");

  const { data, isLoading, isError } = useQuery(["getPosts"], async () => {
    return getPosts()
      .then((response) => response.data.posts)
      .catch((error) => console.log(error.response.data));
  });

  if (isLoading) return <Loading />;

  if (!data || isError) return <h1>khorda</h1>;

  return (
    <Container>
      <Body>
        {data.map((post: any) => (
          <PostContainer
            key={post._id}
            id={post._id}
            comments={post.comments}
            content={post.body}
            author={post.createdBy.username}
            date={post.createdAt}
            setPost={setSelectedPost}
          ></PostContainer>
        ))}
      </Body>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 100%;

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

const Body = styled.div`
  padding: 30px 40px 70px 40px;
  min-height: 100vh;

  @media (max-width: 767.98px) {
    padding: 30px 0 70px 0;
  }
`;

export default Posts;
