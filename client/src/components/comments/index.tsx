import React, { SetStateAction } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";

import Comment from "./Comment";
import NewComment from "./NewComment";

import { api } from "../../api";
import { IComment } from "../../interfaces";

type FetchProps = {
  postId: number;
  pageParam: number;
  count: number;
};

export type FetchPromise = {
  data: IComment[];
  nextPage?: number;
};

const fetchComments = async ({ postId, pageParam, count }: FetchProps): Promise<FetchPromise> => {
  const offset = pageParam * 3;
  const limit = pageParam === 0 ? 3 : count; // in the second fetch get all comments
  const hasNextPage = pageParam === 0 && count > 3;

  return await api
    .get(`/posts/${postId}/comments?offset=${offset}&limit=${limit}`)
    .then(({ data }: { data: IComment[] }) => {
      return {
        data: data.reverse(),
        nextPage: hasNextPage ? pageParam + 1 : undefined,
      };
    });
};

type CommentsProps = {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
  postId: number;
  showReplyField: boolean;
  setShowReplyField: React.Dispatch<SetStateAction<boolean>>;
};

const Comments = (props: CommentsProps) => {
  const { postId, count, setCount, showReplyField, setShowReplyField } = props;

  const infiniteQuery = useInfiniteQuery(
    `fetch Comments ${props.postId}`,
    ({ pageParam = 0 }) => fetchComments({ postId, pageParam, count }),
    {
      getNextPageParam: (data) => data.nextPage,
    }
  );

  if (infiniteQuery.isError) return <p>Error</p>;

  return (
    <Container>
      {infiniteQuery.hasNextPage && (
        <LoadMore onClick={() => infiniteQuery.fetchNextPage()}>
          <span className="fa fa-eye">{` Show all ${count} comments`} </span>
        </LoadMore>
      )}
      {infiniteQuery.isFetching && <Loading></Loading>}
      {infiniteQuery.isSuccess &&
        infiniteQuery.data.pages
          .slice(0)
          .reverse()
          .map((page, x) => (
            <div key={x}>
              {page.data.map((comment, y) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={postId}
                  cacheIndex={[infiniteQuery.data.pages.length - 1 - x, y]}
                />
              ))}
            </div>
          ))}
      {showReplyField && (
        <NewComment postId={postId} setCount={setCount} setShowReplyField={setShowReplyField} />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-left: 3rem;

  @media (max-width: 767.98px) {
    margin-left: 0;
  }
`;

const Loading = styled.div`
  cursor: pointer;
  color: #8224e3;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const LoadMore = styled.div`
  cursor: pointer;
  font-size: 16px;
  color: #8224e3;
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export default Comments;
