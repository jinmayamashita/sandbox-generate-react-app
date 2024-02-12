import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppProviders from "./app-providers";
import App from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
