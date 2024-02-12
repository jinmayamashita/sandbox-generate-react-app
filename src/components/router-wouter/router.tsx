import { Route, Switch } from "wouter";

function HomePage() {
  return <div>Hello world!</div>;
}

function ErrorPage() {
  return <div>404</div>;
}

export default function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={ErrorPage} />
    </Switch>
  );
}
