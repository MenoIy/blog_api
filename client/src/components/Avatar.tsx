import styled from "styled-components";
import dotenv from "dotenv";

dotenv.config();

type AvatarProps = {
  avatar: string;
  size?: {
    width: string;
    height: string;
  };
};

const Avatar = (props: AvatarProps): JSX.Element => {
  const { avatar, size } = props;
  const src = avatar ? `${process.env.REACT_APP_API}${avatar}` : "avatar,png";
  return (
    <Container width={size?.width || "40px"} height={size?.height || "40px"}>
      <img src={src} alt="avatar"></img>
    </Container>
  );
};

const Container = styled.div<{ width: string; height: string }>`
  cursor: pointer;
  img {
    vertical-align: middle;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 50%;
  }
`;

export default Avatar;
