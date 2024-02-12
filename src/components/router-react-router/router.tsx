import { RouterProvider, createBrowserRouter } from "react-router-dom";

function HomePage() {
  return <div>Hello world!</div>;
}

function ErrorPage() {
  return <div>404</div>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
