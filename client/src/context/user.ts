import { createContext, SetStateAction, Dispatch } from "react";
import { IUser } from "../interfaces";

type IUserContext = {
  user: IUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<IUser | null>> | null;
};

export default createContext<IUserContext>({
  user: null,
  isLoading: false,
  setUser: null,
});
