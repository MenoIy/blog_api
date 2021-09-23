import styled from "styled-components";
import { getComments } from "../api";
import { useQuery } from "react-query";
import Loading from "./Loading";
import CommentContainer from "./CommentContainer";

type CommentsProps = {
  postId: string;
  setPost: (id: string) => void;
};

const Comments = (props: CommentsProps) => {
  const { data, isLoading, isError } = useQuery(
    ["getComments", props.postId],
    async () => {
      return await getComments(props.postId)
        .then((response) => {
          return response.data.comments;
        })
        .catch((error) => console.log(error.response.data));
    }
  );

  if (isLoading) return <Loading />;

  if (!data || isError) return <h1>Error</h1>;

  return (
    <Container onClick={() => props.setPost("")}>
      <div>
        <CloseButton />
        {data.map((comment: any) => (
          <CommentContainer
            key={comment._id}
            author={data.createdBy}
            content={data.content}
          ></CommentContainer>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  border: red solid 1px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  padding: auto;
  background-color: rgb(150, 150, 150, 0.5);
  div {
    background-color: antiquewhite;
    width: 60%;
    margin: auto;
  }
`;

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
`;

export default Comments;
