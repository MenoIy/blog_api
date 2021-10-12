import styled from "styled-components";

type InputProps = {
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent) => void;
  value: string;
  error?: string;
  touched?: boolean;
};

const Input = (props: InputProps) => {
  const { error, touched, ...rest } = props;

  return (
    <Container error={!!error && !!touched}>
      <input {...rest} type={rest.name === "password" ? "password" : "text"} />
      {error && touched && <p>{props.error}</p>}
    </Container>
  );
};

const Container = styled.div<{ error: boolean }>`
  input {
    border-radius: 20px;
    font-size: 14px;
    font-family: inherit;
    padding: 10px 15px;
    border: 1px solid #bbbbdc;
    border-color: ${(props) => (props.error ? "#ff2525" : "#bbbbdc")};
    height: 40px;
    width: 100%;
    outline: none;
  }
  input:focus {
    border-color: ${(props) => (props.error ? "#ff2525" : "#a968ec")};
  }
  p {
    color: red;
    font-size: 12px;
    margin-top: 2px;
    word-break: break-all;
  }
`;

export default Input;
