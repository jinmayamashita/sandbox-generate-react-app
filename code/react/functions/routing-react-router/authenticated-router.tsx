import { RouterProvider, createBrowserRouter } from "react-router-dom";

function HomePage() {
  return <div>Hello world!</div>;
}

function ErrorPage() {
  return <div>404</div>;
}

function SigninPage() {
  return <div>Sign in</div>;
}

const authenticatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

const unAuthenticatedRouter = createBrowserRouter([
  {
    path: "/",
    element: <SigninPage />,
    errorElement: <ErrorPage />,
  },
]);

type Props = {
  isAuthenticated: boolean;
};
export default function Router({ isAuthenticated }: Props) {
  const router = isAuthenticated ? authenticatedRouter : unAuthenticatedRouter;
  return <RouterProvider router={router} />;
}
