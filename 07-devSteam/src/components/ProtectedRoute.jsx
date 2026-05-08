import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, requiredLevel = null, isLoggedIn, isAdmin }) {

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredLevel === "ADMIN" && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
