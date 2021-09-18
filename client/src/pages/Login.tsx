import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import { loginSchema } from "../validators";

const Container = styled.div``;

const LoginContainer = styled.div``;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const LoginInput = styled.input``;

const LoginError = styled.div``;

const LoginButton = styled.button``;

const Login = () => {
  const login = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { errors, touched } = login;
  return (
    <Container>
      <LoginContainer>
        <LoginForm onSubmit={login.handleSubmit}>
          <LoginInput
            name="username"
            placeholder="Username"
            type="text"
            onChange={login.handleChange}
            value={login.values.username}
          /> 
          {errors.username && touched.username && (
            <LoginError>{errors.username}</LoginError>
          )}
          <LoginInput
            name="password"
            placeholder="Password"
            type="password"
            onChange={login.handleChange}
            value={login.values.password}
          />
          {login.errors.password && login.touched.password && (
            <LoginError>{errors.password}</LoginError>
          )}
          <LoginButton disabled={login.isSubmitting}>Log In</LoginButton>
        </LoginForm>
      </LoginContainer>
      <Footer />
    </Container>
  );
};

export default Login;
