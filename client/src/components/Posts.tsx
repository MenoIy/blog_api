import React, { useRef, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { getPosts } from "../api/";
import Comments from "./Comments";
import Loading from "./Loading";
import PostContainer from "./PostContainer";

const Posts = (props: { username?: string }) => {
  const [selectedPost, setSelectedPost] = useState<string>("");
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { data, isLoading, isError } = useQuery(["getPosts"], async () => {
    return getPosts()
      .then((response) => response.data.posts)
      .catch((error) => console.log(error.response.data));
  });

  if (isLoading) return <Loading />;

  if (!data || isError) return <h1>khorda</h1>;

  return (
    <Container ref={containerRef}>
      {selectedPost && (
        <Comments postId={selectedPost} setPost={setSelectedPost}></Comments>
      )}
      {data.map((post: any) => (
        <PostContainer
          key={post._id}
          id={post._id}
          comments={post.comments}
          content={post.body}
          createdAt={post.createdAt}
          createdBy={post.createdBy.username}
          setPost={setSelectedPost}
        ></PostContainer>
      ))}
    </Container>
  );
};

const PostsProvider = (props: { username?: string }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Posts {...props} />
    </QueryClientProvider>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default PostsProvider;
