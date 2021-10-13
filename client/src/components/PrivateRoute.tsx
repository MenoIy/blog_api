import { Route, Redirect } from "react-router-dom";
import { useUserState } from "../context/userContext";

type Props = {
  children: any;
  path: string;
  redirect?: string;
};

const PrivateRoute = (props: Props) => {
  const { children, ...rest } = props;

  const user = useUserState();

  return (
    <>
      {user ? (
        <Route path={rest.path}>{children}</Route>
      ) : (
        <Redirect to={{ pathname: rest.redirect }} />
      )}
    </>
  );
};

export default PrivateRoute;
