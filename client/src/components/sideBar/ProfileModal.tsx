import styled from "styled-components";
import { Link } from "react-router-dom";

import { IUser } from "../../interfaces";
import Avatar from "../Avatar";

const ProfileModal = (props: { user: IUser }) => {
  const { user } = props;

  return (
    <>
      <Link to={{ pathname: `/${user.username}` }}>
        <Avatar avatar={user.avatar} size={{ width: "50px", height: "50px" }} />
      </Link>
      <User>
        <Link to={{ pathname: `/${user.username}` }}>
          <p>{user.username}</p>
        </Link>

        <span>Member</span>
      </User>
      <Info>
        <div>
          <p>{user.comments.length}</p>
          <span>Comments</span>
        </div>
        <div>
          <p>{user.posts.length}</p>
          <span>Posts</span>
        </div>
      </Info>
    </>
  );
};

const User = styled.div`
  width: 90%;
  padding: 15px;
  a {
    text-decoration: none;
  }

  p {
    font-size: 1rem;
    font-weight: 700;
    color: #626c72;
  }
  span {
    font-size: 85%;
    font-weight: 400;
    color: #bbbbdc;
  }
  border-bottom: 1px rgb(231, 237, 242) solid;
`;

const Info = styled.div`
  display: flex;
  line-height: 1.35;
  gap: 30px;
  margin-top: 10px;
  p {
    font-size: 14px;
    font-weight: 600;
  }
  span {
    color: #bbbbdc;
    font-weight: 400;
    font-size: 90%;
  }
`;

export default ProfileModal;
