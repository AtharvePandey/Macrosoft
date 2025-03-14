import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@style/index.css";
import App from "@page/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
