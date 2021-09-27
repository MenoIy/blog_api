import styled from "styled-components";
import { getComments } from "../api";
import { useQuery } from "react-query";
import Loading from "./Loading";
import CommentContainer from "./CommentContainer";

type CommentsProps = {
  id: string;
  setPost?: (id: string) => void;
};

const Comments = (props: CommentsProps) => {
  const { data, isLoading, isError } = useQuery(
    ["getComments", props.id],
    async () => {
      return await getComments(props.id)
        .then((response) => {
          return response.data.comments;
        })
        .catch((error) => console.log(error.response.data));
    }
  );

  if (isLoading) return <Loading />;

  if (!data || isError) return <h1>Error</h1>;

  return (
    <Container>
      <div>
        {data.length > 3 && (
          <Button>
            <span className="fa fa-eye">
              {` Show all ${data.length} comments`}{" "}
            </span>
          </Button>
        )}
        {data.map((comment: any) => (
          <CommentContainer
            key={comment._id}
            author={comment.createdBy.username}
            createdAt={comment.createdAt}
            content={comment.content}
          ></CommentContainer>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div``;

const Button = styled.button`
  border: none;
  background: none;
  span {
    color: #8224e3;
    font-size: 16px;
  }
  margin-left: 3.2rem;
  margin-top: 10px;
  margin-bottom: 5px;
  @media (max-width: 767.98px) {
    margin-left: 0.3rem;
  }
`;

export default Comments;
