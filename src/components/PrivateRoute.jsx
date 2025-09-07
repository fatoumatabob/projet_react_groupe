import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // vérifie si l’utilisateur est connecté
  return token ? children : <Navigate to="/login" replace />;
}
