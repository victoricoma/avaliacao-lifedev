import { Navigate, Outlet } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuthValue();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;