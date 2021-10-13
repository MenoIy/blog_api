import styled from "styled-components";

const Search = () => {
  return (
    <Container>
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Search..." />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 80%;
  flex-wrap: wrap;
  align-items: center;
  color: #626c72;
  font-size: 14px;
  height: 100%;
  gap: 7px;

  input {
    height: 100%;
    font-size: 16px;
    outline: none;
    border: none;
    font-family: inherit;
    width: 60%;
  }
`;

export default Search;
