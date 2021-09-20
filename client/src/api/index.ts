import axios from "axios";

interface loginProps {
  username: string;
  password: string;
}

const url: string = "http://localhost:5000";

export const login = (loginInfo: loginProps) => {
  return axios.post(`${url}/users/login`, loginInfo);
};
