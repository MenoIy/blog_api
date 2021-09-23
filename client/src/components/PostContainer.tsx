import styled from "styled-components";

type PostProps = {
  id: "string";
  content: Array<string>;
  comments: Array<String>;
  createdBy: string;
  createdAt: Date;
  setPost: (id: string) => void;
};

const PostContainer = (props: PostProps) => {
  return (
    <Container>
      <AuthorContainer>
        <Avatar>
          <img src="avatar.png" alt="avatar" />
        </Avatar>
        <Author>
          <h1>{props.createdBy}</h1>
        </Author>
      </AuthorContainer>
      <Content>
        <p>{props.content}</p>
      </Content>
      <PostElements>
        <Comment
          onClick={() => {
            props.setPost(props.id);
          }}
        >
          <span className="far fa-comment"></span>
          <h1>{props.comments.length}</h1>
        </Comment>
      </PostElements>
    </Container>
  );
};
const Container = styled.div`
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

const Content = styled.div`
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

export default PostContainer;
