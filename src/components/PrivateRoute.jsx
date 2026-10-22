import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isAuthLoading } = useContext(AuthContext);
  if (isAuthLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export { PrivateRoute };
