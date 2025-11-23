import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useUserData from "../../hooks/useUserData";

function ProtectedRoute({ children, role }) {
  const user = useUserData();

  if (!user || user?.role?.[0] !== role) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string.isRequired,
};

export default ProtectedRoute;
