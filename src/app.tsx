import { Link } from "wouter";
import { Routes } from "./routes";
import { AuthProvider } from "./modules/auth";

function Navigation() {
  return <Link href="/">Home</Link>;
}

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <Routes />
    </AuthProvider>
  );
}
