import styled from "styled-components";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useQueryClient } from "react-query";

import Input from "../Input";
import Button from "../Button";
import { loginSchema } from "../../validators";
import { api } from "../../api/";

type LoginProps = {
  username: string;
  password: string;
};

const LoginModal = () => {
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }) => {
      await api
        .post(`/users/login`, { username, password })
        .then(() => queryClient.invalidateQueries(`auth`))
        .catch((error: any) => console.log(error));
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Input
        name="username"
        placeholder="Username"
        onChange={formik.handleChange}
        value={formik.values.username}
        error={formik.errors.username}
        touched={formik.touched.username}
      />
      <Input
        name="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
        touched={formik.touched.password}
      />

      <Button type="submit" width="218px" height="35px">
        Login
      </Button>
      <Signup>
        <h4>Don't have an account?</h4>
        <h4>
          <Link to="/register">Sign up</Link>
        </h4>
      </Signup>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Signup = styled.div`
  font-size: 12px;
  width: 100%;
  margin: auto;

  h4 {
    display: inline;
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.6);
  }
  a {
    color: rgba(169, 104, 236, 0.7);
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    color: rgb(169, 104, 236);
  }
`;

export default LoginModal;
