import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/user";

type Props = {
  children: any;
  path: string;
  redirect?: string;
};

const PrivateRoute = (props: Props) => {
  const { children, ...rest } = props;

  const context = useContext(UserContext);

  if (context.isLoading) return <h1>Loading</h1>;
  return (
    <>
      {context.user ? (
        <Route path={rest.path}>{children}</Route>
      ) : (
        <Redirect to={{ pathname: rest.redirect }} />
      )}
    </>
  );
};

export default PrivateRoute;
