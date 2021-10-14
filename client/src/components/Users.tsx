import styled from "styled-components";
import { useQuery } from "react-query";

import Modal from "./sideBar/ProfileModal";
import Loading from "./Loading";
import { api } from "../api";
import { IUser } from "../interfaces";

const fetchUsers = async (): Promise<IUser[]> => {
  return await api.get(`/users`).then(({ data }: { data: IUser[] }) => data);
};

const Users = () => {
  const { data, isLoading, isError } = useQuery(`fetch Users`, fetchUsers);

  if (isError) return <p>Error</p>;
  if (isLoading) return <Loading />;

  return (
    <Container>
      <Body>{data && data.map((user: IUser) => <Modal user={user} hide={false} />)}</Body>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
  max-width: 100%;
  flex: 66.6666%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;

  @media (min-width: 1024.6px) {
    max-width: 66.666667%;
  }
  transition: max-width 0.75s cubic-bezier(0.685, 0.0473, 0.346, 1);
`;

const Body = styled.div`
  min-height: 100vh;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  gap: 0px 30px;
`;

export default Users;
