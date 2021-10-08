import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import { formatDistanceToNowStrict } from "date-fns";

type AuthorProps = {
  username: string;
  avatar: string;
  date: Date;
  size?: { width: string; height: string };
  gap: string;
  direction?: string;
};

const elapsedTime = (date: Date) => {
  return formatDistanceToNowStrict(new Date(date), {
    addSuffix: true,
  });
};

const Author = (props: AuthorProps): JSX.Element => {
  const { username, avatar, date, gap, size, direction } = props;
  const path = `/${username}`;

  return (
    <Container gap={gap} direction={direction}>
      <Link to={{ pathname: path }}>
        <Avatar avatar={avatar} size={size} />
      </Link>
      <div>
        <Link to={{ pathname: path }}>{username}</Link>
        <p>{elapsedTime(date)}</p>
      </div>
    </Container>
  );
};

const Container = styled.div<{ gap: string; direction?: string }>`
  display: flex;
  align-items: center;
  gap: ${(props) => props.gap};
  a {
    text-decoration: none;
    color: #4f515b;
    font-weight: 600;
  }
  p {
    font-size: 90%;
    color: rgba(100, 100, 100, 0.5);
  }
  div {
    display: flex;
    flex-direction: ${(props) => props.direction || "wrap"};
    gap: 5px;
  }
`;

export default Author;
