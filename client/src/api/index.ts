import axios from "axios";

type loginProps = {
  username: string;
  password: string;
};

type RegisterProps = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const url: string = "http://localhost:5000";

export const login = (loginInfo: loginProps) => {
  return axios.post(`${url}/users/login`, loginInfo);
};

export const register = (registerInfo: RegisterProps) => {
  return axios.post(`${url}/users/`, registerInfo);
};
