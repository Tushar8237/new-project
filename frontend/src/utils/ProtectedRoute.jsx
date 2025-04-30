import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = false;
  return user ? children : <Navigate to="/login" />;
};
