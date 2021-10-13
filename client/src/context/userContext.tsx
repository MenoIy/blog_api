import React, { SetStateAction, Dispatch } from "react";
import { useQuery } from "react-query";

import { api } from "../api";
import { IUser } from "../interfaces";

const UserStateContext = React.createContext<IUser | null>(null);
const UserStateUpdater =
  React.createContext<Dispatch<SetStateAction<IUser | null>> | undefined>(undefined);

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  useQuery(
    `auth`,
    async () => {
      return await api.get("/users/me").then(({ data }: { data: IUser }) => data);
    },
    {
      onSuccess: (data) => {
        setUser(data);
      },
      onError: (error) => {
        console.log(error);
      },
      retry: false,
    }
  );

  return (
    <UserStateContext.Provider value={user}>
      <UserStateUpdater.Provider value={setUser}>{props.children}</UserStateUpdater.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const userState = React.useContext(UserStateContext);

  if (userState === undefined) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return userState;
};

export const useUserUpdater = () => {
  const userUpdater = React.useContext(UserStateUpdater);

  if (userUpdater === undefined) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return userUpdater;
};
