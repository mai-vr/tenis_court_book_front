import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { RouterApp } from "./routes/RouterApp";
import "./styles/index.css";
import { ClubsProvider } from "./context/ClubsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ClubsProvider>
        <RouterApp />
      </ClubsProvider>
    </AuthProvider>
  </StrictMode>,
);
