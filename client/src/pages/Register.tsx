import { useFormik } from "formik";
import styled from "styled-components";
import { registerSchema } from "../validators";
import Field from "../components/Field";
import { register } from "../api";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 850px;
  display: flex;
  flex-direction: column;
`;

const SignupContainer = styled.div`
  width: 440px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: gray;
  box-shadow: 5px 5px 15px gray;
`;

const Text = styled.div`
  margin: 40px 40px -10px 40px;
  font-size: 10px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 30px 40px;
`;

const RegisterButton = styled.button`
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

const SignIn = styled.div`
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

const Register = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      await register(formik.values)
        .then()
        .catch((error) => formik.setErrors(error.response.data));
    },
  });

  return (
    <Container>
      <SignupContainer>
        <Text>
          <h1>Create your account</h1>
        </Text>
        <SignupForm onSubmit={formik.handleSubmit}>
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
            name="firstName"
            type="text"
            label="First name"
            value={formik.values.firstName}
            handleChange={formik.handleChange}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
          <Field
            name="lastName"
            type="text"
            label="Last name"
            value={formik.values.lastName}
            handleChange={formik.handleChange}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
          <Field
            name="email"
            type="text"
            label="Address mail"
            value={formik.values.email}
            handleChange={formik.handleChange}
            error={formik.errors.email}
            touched={formik.touched.email}
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
          <RegisterButton type="submit" disabled={formik.isSubmitting}>
            Register
          </RegisterButton>
        </SignupForm>
      </SignupContainer>
      <SignIn>
        <h4>Already have an account?</h4>
        <h4>
          <Link to="/login">Sign in</Link>
        </h4>
      </SignIn>
    </Container>
  );
};

export default Register;
