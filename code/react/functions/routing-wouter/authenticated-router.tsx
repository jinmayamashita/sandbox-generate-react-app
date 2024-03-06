import { Route, Switch } from "wouter";

function HomePage() {
  return <div>Hello world!</div>;
}

function ErrorPage() {
  return <div>404</div>;
}

function SigninPage() {
  return <div>Sign in</div>;
}

function AuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

function UnAuthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/" component={SigninPage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}

type Props = {
  isAuthenticated: boolean;
};
export default function Router({ isAuthenticated }: Props) {
  return isAuthenticated ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />;
}
