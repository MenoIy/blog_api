import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { UserProvider } from "./context/userContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <Switch>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/:username">
              <Home />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
