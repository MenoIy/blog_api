import axios from "axios";

interface loginProps {
  username: string;
  password: string;
}

const url: string = "http://localhost:5000";

export const login = (loginInfo: loginProps) => {
  axios
    .post(`${url}/users/login`, loginInfo)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log("error is ", error.response);
    });
};
