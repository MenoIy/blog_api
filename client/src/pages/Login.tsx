import styled from "styled-components";
import { useFormik } from "formik";
import { loginSchema } from "../validators";

const Container = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const Signup = styled.div`
  text-align: center;
  font-size: 14px;
  width: 440px;
  margin: auto;
  margin-top: 0px;

  h4 {
    display: inline;
    margin-right: 10px;
  }
  h4:nth-child(2) {
    color: #dc2068;
    cursor: pointer;
  }
`;

const Text = styled.div`
  margin: 40px 40px -10px 40px;
  font-size: 10px;
`;

const LoginContainer = styled.div`
  width: 440px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: gray;
  box-shadow: 5px 5px 15px gray;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 30px 40px;

  label {
    margin-bottom: 5px;
    font-size: 15px;
    margin-top: 15px;
    font-weight: 500;
  }
`;

const LoginInput = styled.input`
  font-size: 16px;
  font-weight: 400;
  padding: 8px 16px;
  min-height: 26px;
  border-radius: 5px;
  border: solid 1px;
  outline: unset;
  border-color: #d2d2d2;
  &:focus {
    border-color: #dc2068;
  }
`;

const LoginError = styled.div`
  color: red;
  margin-top: 3px;
  font-size: 13px;
`;

const LoginButton = styled.button`
  font-size: 20px;
  margin-top: 30px;
  min-height: 45px;
  border-radius: 5px;
  border: unset;
  font-weight: 600;
  color: white;
  background-color: #ff2f71;
  cursor: pointer;
`;

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
        <Text>
          <h1>Sign in to your account</h1>
        </Text>
        <LoginForm onSubmit={login.handleSubmit}>
          <label>Username</label>
          <LoginInput
            name="username"
            type="text"
            onChange={login.handleChange}
            value={login.values.username}
          />
          {errors.username && touched.username && (
            <LoginError>{errors.username}</LoginError>
          )}
          <label>Password</label>
          <LoginInput
            name="password"
            type="password"
            onChange={login.handleChange}
            value={login.values.password}
          />
          {login.errors.password && login.touched.password && (
            <LoginError>{errors.password}</LoginError>
          )}
          <LoginButton type="submit" disabled={login.isSubmitting}>
            Log In
          </LoginButton>
        </LoginForm>
      </LoginContainer>
      <Signup>
        <h4>Don't have an account?</h4>
        <h4>Sign up</h4>
      </Signup>
    </Container>
  );
};

export default Login;
