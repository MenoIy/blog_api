import { useState } from "react";
import styled from "styled-components";
import { getComments } from "../api";
import { useQuery } from "react-query";
import Loading from "./Loading";
import CommentContainer from "./CommentContainer";
import Avatar from "./Avatar";

type CommentsProps = {
  id: string;
  count: number;
  setPost?: (id: string) => void;
};

const Comments = (props: CommentsProps) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery(
    ["getComments", props.id, showAllComments],
    async () => {
      return await getComments(props.id, !showAllComments)
        .then((response) => {
          return response.data.comments;
        })
        .catch((error) => console.log(error.response.data));
    }
  );

  if (isLoading) return <Loading />;

  if (!data || isError) return <h1>Error</h1>;

  const handleClick = () => {
    setShowAllComments((prev) => !prev);
  };

  return (
    <Container>
      <div>
        {props.count > 3 && (
          <Button onClick={handleClick}>
            <span className="fa fa-eye">
              {` Show all ${props.count} comments`}{" "}
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
        <CreateComment>
          <Avatar img="avatar.png" size={{ width: "30px", height: "30px" }} />
          <textarea></textarea>
        </CreateComment>
      </div>
    </Container>
  );
};

const CreateComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  textarea {
    width: 100%;
    border: 1px solid #e7edf2;
    border-radius: 50px;
    height: 2.5rem;
    font-size: 16px;
    outline: none;
    resize: vertical;
    color: #626c72;
    font-family: inherit;
    resize: vertical;
    margin-left: 3px;
  }
  textarea:focus {
    border-color: #8224e3;
  }
`;

const Container = styled.div`
  margin-left: 3rem;

  @media (max-width: 767.98px) {
    margin-left: 0;
  }
`;

const Button = styled.button`
  cursor: pointer;
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
