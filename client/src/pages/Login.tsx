import styled from "styled-components";
import { useFormik } from "formik";
import { loginSchema } from "../validators";
import { login } from "../api/";
import Field from "../components/Field";
import { Link } from "react-router-dom";

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
  a {
    color: #dc2068;
    cursor: pointer;
    text-decoration: none;
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
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: loginSchema,
    onSubmit: async ({ username, password }) => {
      await login({ username, password })
        .then((response) => console.log(response.data.authToken))
        .catch((error) => formik.setErrors(error.response.data));
    },
  });
  return (
    <Container>
      <LoginContainer>
        <Text>
          <h1>Sign in to your account</h1>
        </Text>
        <LoginForm onSubmit={formik.handleSubmit}>
          <Field
            name="username"
            type="text"
            label="Username"
            value={formik.values.username}
            handleChange={formik.handleChange}
            error={formik.errors.username}
            touched={formik.touched.username}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            value={formik.values.password}
            handleChange={formik.handleChange}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          {formik.errors.email && (
            <LoginError>{formik.errors.email}</LoginError>
          )}
          <LoginButton type="submit" disabled={formik.isSubmitting}>
            Log In
          </LoginButton>
        </LoginForm>
      </LoginContainer>
      <Signup>
        <h4>Don't have an account?</h4>
        <h4>
          <Link to="/register">Sign up</Link>
        </h4>
      </Signup>
    </Container>
  );
};

export default Login;
