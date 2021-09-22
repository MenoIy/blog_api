import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { getPosts } from "../api/";
import Comments from "./Comments";

const Post = (props: PostProps) => {
  return (
    <PostContainer>
      <AuthorContainer>
        <Avatar>
          <img src="avatar.png" alt="avatar" />
        </Avatar>
        <Author>
          <h1>{props.createdBy}</h1>
        </Author>
      </AuthorContainer>
      <PostContent>
        <p>{props.content}</p>
      </PostContent>
      <PostElements>
        <Comment onClick={() => props.setPost(props.id)}>
          <span className="far fa-comment"></span>
          <h1>{props.comments.length}</h1>
        </Comment>
      </PostElements>
    </PostContainer>
  );
};

const Posts = (props: { username?: string }) => {
  const [selectedPost, setSelectedPost] = useState<string>("");

  const { data, isLoading, isError } = useQuery(["getPosts"], () => {
    return getPosts()
      .then((response) => response.data.posts)
      .catch((error) => console.log(error.response.data));
  });
  if (!data || isLoading || isError) return <h1>khorda</h1>;

  return (
    <Container>
      {selectedPost && <Comments postId={selectedPost}></Comments>}
      {data.map((post: any) => (
        <Post
          key={post._id}
          id={post._id}
          comments={post.comments}
          content={post.body}
          createdAt={post.createdAt}
          createdBy={post.createdBy.username}
          setPost={setSelectedPost}
        ></Post>
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

const PostContainer = styled.div`
  width: 60%;
  border-radius: 20px;
  box-shadow: 0px 3px 7px 0px #64405e;
  margin: 15px auto;
  padding: 5px 5px;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 320) {
    width: 90%;
  }
`;

const PostContent = styled.div`
  margin: 20px;
  word-break: break-all;
  line-height: 20px;
`;
const PostElements = styled.div`
  display: flex;
  margin: 30px 25px 5px 25px;
`;

const Comment = styled.div`
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  span {
    font-size: 17px;
  }
  h1 {
    font-size: 15px;
    margin-left: 10px;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  text-align: center;
  cursor: pointer;
  padding: 5px;
  padding-bottom: 10px;
`;

const Avatar = styled.div`
  width: 100px;
  img {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const Author = styled.div`
  margin: auto 0px;
  font-size: 10px;
`;

type PostProps = {
  id: "string";
  content: Array<string>;
  comments: Array<String>;
  createdBy: string;
  createdAt: Date;
  setPost: (id: string) => void;
};

export default PostsProvider;
