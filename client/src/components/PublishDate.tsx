import styled from "styled-components";
import { formatDistanceToNowStrict } from "date-fns";

const PublishDate = (props: { date: Date }): JSX.Element => {
  //
  const getElapsedTime = () => {
    return formatDistanceToNowStrict(new Date(props.date), {
      addSuffix: true,
    });
  };
  //
  return <Container>{getElapsedTime()}</Container>;
};

const Container = styled.p`
  font-size: 90%;
  color: rgba(100, 100, 100, 0.5);
`;

export default PublishDate;
