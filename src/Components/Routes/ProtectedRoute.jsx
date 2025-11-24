import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../../hooks/useUserData";

function ProtectedRoute({ children }) {
  const user = useUserData();

  if (!user || !user?.role?.includes("admin")) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
