import styled from "styled-components";
import { useQuery } from "react-query";
import { getUsers } from "../api";

import Avatar from "./Avatar";
import Loading from "./Loading";

import { IUser } from "../interfaces/";

const Peoples = () => {
  const { data, isLoading, isError } = useQuery(["getUsers"], async () => {
    return getUsers(6)
      .then((response) => response.data.users)
      .catch((error) => console.log(error.response.data));
  });

  if (isLoading) return <Loading />;

  if (!data || isError) return <h1>khorda</h1>;

  return (
    <Container>
      <Body>
        <Title>
          <h5>Members</h5>
        </Title>
        <Members>
          {data.map((user: IUser) => (
            <Member key={user._id}>
              <Avatar img="avatar.png"></Avatar>
              <Name>
                <a href=".">{user.username}</a>
              </Name>
            </Member>
          ))}
        </Members>
      </Body>
    </Container>
  );
};
const Container = styled.div`
  padding: 20px 30px;
  height: auto;
  flex: 33.3333%;
  border-left: 1px #e7edf2 solid;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Body = styled.div`
  background: linear-gradient(
    135deg,
    rgba(130, 36, 227, 0.04) 0%,
    rgba(255, 255, 255, 0) 25%,
    rgba(130, 36, 227, 0.07) 100%
  );
  padding: 32px;
  border-radius: 12px;
  position: fixed;
  width: 325px;
`;

const Title = styled.div`
  position: relative;
  h5 {
    font-size: 1.1rem;
    color: #4f515b;
    font-family: "Quicksand", Verdana, sans-serif;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
  }
  h5:after {
    background: #8224e3;
    content: "";
    height: 2px;
    width: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

const Members = styled.div`
  margin-top: 1.5rem;
  line-height: 1.5;
`;

const Member = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Name = styled.div`
  a {
    text-decoration: none;
    color: #4f515b;
  }
  font-weight: 600;
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

export default Peoples;
