import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserContext from "./context/user";
import PrivateRoute from "./components/PrivateRoute";
import { IUser } from "./interfaces/user";
import { auth } from "./api";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    auth()
      .then(({ data }: { data: IUser }) => {
        setUser(data);
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
            <PrivateRoute path="/" redirect="/login">
              <Home />
            </PrivateRoute>
          </Switch>
        </Router>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
