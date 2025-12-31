/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

export const categoryRoutesMap = {
  all: ["*"],
  customers: ["customers"],
  dealer: [
    "all-dealer",
    "dealer-details",
    "dealer-request",
    "potentials_dealer",
  ],
  deals: ["all-deals", "deals-analytics", "dealType"],
  cities: ["cities", "region"],
  subscription: ["subscription", "earning"],
};

// Normalize: "dealer-details/12" → "dealer-details"
const normalizeRoute = (route) => route.split("/")[0];

const CategoryProtectedRoute = ({ user, routeName, children }) => {
  const location = useLocation();
  const cleanRoute = normalizeRoute(routeName);

  // Always allow profile, logout, settings
  if (["profile", "logout", "settings"].includes(cleanRoute)) {
    return children;
  }

  // Sub-admin check
  const userCategories = user?.categoryPermissions || [];
  let allowed = false;

  for (let i = 0; i < userCategories.length; i++) {
    const category = userCategories[i];
    const allowedRoutes = categoryRoutesMap[category];

    if (!allowedRoutes) continue;

    if (allowedRoutes.includes(cleanRoute) || allowedRoutes.includes("*")) {
      allowed = true;
      break;
    }
  }

  if (!allowed) {
    return <Navigate to="/not-found" state={{ from: location }} replace />;
  }

  return children;
};

export default CategoryProtectedRoute;
