import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children, requiredLevel = null }) {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredLevel === "ADMIN" && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
