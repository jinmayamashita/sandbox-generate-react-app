import { Route, Switch, Redirect } from "wouter";
import { useAuth } from "./modules/auth";

function Login() {
  const { login } = useAuth();
  return (
    <div>
      <button onClick={() => login({ id: 123, username: "John" })}>
        Signin
      </button>
    </div>
  );
}

function Home() {
  const { logout } = useAuth();
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function NotFound() {
  return <div>404</div>;
}

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Redirect to="/" />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function UnAuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route>
        <Redirect to="login" />
      </Route>
    </Switch>
  );
}

export function Routes() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}
