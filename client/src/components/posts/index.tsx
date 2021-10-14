import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

import { IPost } from "../../interfaces";
import { api } from "../../api";

import NewPost from "./NewPost";
import Post from "./Post";
import { useUserState } from "../../context/userContext";

export type FetchPromise = {
  data: IPost[];
  nextPage?: number;
};

type FetchProps = {
  pageParam: number;
  username?: string;
};

const fetchPosts = async ({ pageParam, username }: FetchProps): Promise<FetchPromise> => {
  const offset = pageParam * 10;
  const link = username ? `/${username}/posts` : "";

  return await api.get(`/posts${link}?offset=${offset}`).then(({ data }: { data: IPost[] }) => {
    return {
      data: data,
      nextPage: pageParam + 1,
    };
  });
};

type PostsProps = {
  username?: string;
};

const Posts = (props: PostsProps) => {
  const { username } = props;
  const user = useUserState();
  const ref = useRef<HTMLDivElement>(null);

  const infiniteQuery = useInfiniteQuery(
    `fetch Posts ${username || ""}`,
    ({ pageParam = 0 }) => fetchPosts({ pageParam, username }),
    {
      getNextPageParam: (data) => data.nextPage,
    }
  );

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const onScroll = function () {
      if (infiniteQuery.status === "loading") return;
      if (node.scrollTop + node.offsetHeight >= node.scrollHeight) infiniteQuery.fetchNextPage();
    };
    node.addEventListener("scroll", onScroll);
    return () => node.removeEventListener("scroll", onScroll);
  }, []);

  if (infiniteQuery.isError) return <p>Error</p>;

  return (
    <Container ref={ref}>
      <Body>
        {user && (user.username === username || !username) && <NewPost username={username} />}
        {infiniteQuery.isLoading && <Loading />}
        {infiniteQuery.isSuccess &&
          infiniteQuery.data.pages.map((page, x) => (
            <div key={x}>
              {page.data.map((post, y) => (
                <Post username={username} key={post._id} post={post} cacheIndex={[x, y]} />
              ))}
            </div>
          ))}
      </Body>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
  position: relative;
  max-width: 100%;
  flex: 66.6666%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;

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
  @media (min-width: 1024.6px) {
    max-width: 66.666667%;
  }
  transition: max-width 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

const Loading = styled.div`
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  color: #8224e3;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const Body = styled.div`
  padding: 30px 40px 70px 40px;
  min-height: 100vh;

  @media (max-width: 767.98px) {
    padding: 30px 0 70px 0;
  }
`;

export default Posts;
