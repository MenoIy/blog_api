import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContext from "./context/user";
import PrivateRoute from "./components/PrivateRoute";
import { IUser } from "./interfaces";
import { auth } from "./api";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    auth()
      .then(({ data: user }: { data: IUser }) => {
        setUser(user);
        setLoading(false);
      })
      .catch(({ response }) => {
        console.log(response.data);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
