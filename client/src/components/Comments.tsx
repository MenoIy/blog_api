import styled from "styled-components";
import { getComments } from "../api";
import { useQuery } from "react-query";

const Comments = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError } = useQuery(
    ["getComments", postId],
    async () => {
      return await getComments(postId)
        .then((response) => response.data.comments)
        .catch((error) => console.log(error.response.data));
    }
  );

  if (!data || isLoading || isError) return <h1>khorda</h1>;

  return (
    <Container>
      {data.map((comment: any) => (
        <div key={comment._id}>
          <p>{comment.createdBy.username}</p>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  border: red solid 1px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: auto;
  background-color: rgb(0, 0, 0, 0.5);
`;

export default Comments;
