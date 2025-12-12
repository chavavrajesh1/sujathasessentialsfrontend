import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children, redirectTo = "/" }) => {
  const userInfo = useSelector((state) => state.user?.userInfo);

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo.isAdmin) {
    console.warn("Access denied: User is not an admin");
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default AdminRoute;
