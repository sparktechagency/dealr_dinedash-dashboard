import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import SignIn from "../../Pages/Auth/SignIn";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import EditProfile from "../../Pages/Profile/EditProfile";
import Profile from "../../Pages/Profile/Profile";
import Blogs from "../Dashboard/Blogs";
import Category from "../Dashboard/Category";
import Customers from "../Dashboard/Customers";
import Dashboard from "../Dashboard/Dashboard";
import AllDealers from "../Dashboard/Dealers/AllDealers";
import RecipeDetails from "../Dashboard/Dealers/RecipeDetails";
import DealerRequest from "../Dashboard/Dealers/RecipeRequest";
import RecipeRequestDetails from "../Dashboard/Dealers/RecipeRequestDetails";
import AllDeals from "../Dashboard/Deals/AllDeals";
import Earning from "../Dashboard/Earning";
import Logout from "../Dashboard/Logout";
import Notifications from "../Dashboard/Notifications";
import PotentialsDealer from "../Dashboard/PotentialsDealer/PotentialsDealer";
import Region from "../Dashboard/Region";
import PrivacyPolicy from "../Dashboard/settings/PrivacyPolicy";
import Settings from "../Dashboard/settings/Settings";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";
import SettingsForgotPassword from "../Dashboard/settings/SettingsForgotPassword";
import SettingsOtpPage from "../Dashboard/settings/SettingsOtpPage";
import SettingsUpdatePassword from "../Dashboard/settings/SettingsUpdatePassword";
import TermsOfService from "../Dashboard/settings/TermsOfService";
import Subscription from "../Dashboard/Subscription";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import DealAnalytics from "../Dashboard/DealAnalytics/DealAnalytics";
import City from "../Dashboard/City/City";
import Employee from "../Dashboard/Employee/Employee";
import AuthRedirect from "./AuthRedirect";
import ProtectedRoute from "./ProtectedRoute";
import CategoryProtectedRoute from "./CategoryProtectedRoute"; // new wrapper
import Cookies from "js-cookie";
import { decodedToken } from "../../utils/jwt";

const token = Cookies.get("dealr_accessToken");
const currentUser = decodedToken(token);

console.log(currentUser?.categoryPermissions);

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "",
    element: <Main />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "forgot-password/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "customers",
            element: (
              <CategoryProtectedRoute user={currentUser} routeName="customers">
                <Customers />
              </CategoryProtectedRoute>
            ),
          },
          {
            path: "all-dealer",
            element: (
              <CategoryProtectedRoute user={currentUser} routeName="all-dealer">
                <AllDealers />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "dealer-details/:id",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="dealer-details"
              >
                <RecipeDetails />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "dealer-request",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="dealer-request"
              >
                <DealerRequest />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "dealer-request/:id",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="dealer-request"
              >
                <RecipeRequestDetails />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "potentials_dealer",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="potentials_dealer"
              >
                <PotentialsDealer />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "all-deals",
            element: (
              <CategoryProtectedRoute user={currentUser} routeName="all-deals">
                <AllDeals />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "deals-analytics",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="deals-analytics"
              >
                <DealAnalytics />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "cities",
            element: (
              <CategoryProtectedRoute user={currentUser} routeName="cities">
                <City />
              </CategoryProtectedRoute>
            ),
          },

          {
            path: "employees",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="all" // if employee allowed for all
              >
                <Employee />
              </CategoryProtectedRoute>
            ),
          },
          {
            path: "earning",
            element: (
              <CategoryProtectedRoute user={currentUser} routeName="earning">
                {" "}
                <Earning />
              </CategoryProtectedRoute>
            ),
          },
          {
            path: "subscription",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="subscription"
              >
                <Subscription />
              </CategoryProtectedRoute>
            ),
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "setting",
            element: <Settings />,
          },
          {
            path: "region",
            element: <Region />,
          },
          {
            path: "category",
            element: <Category />,
          },
          {
            path: "blogs",
            element: <Blogs />,
          },
          {
            path: "privacy-policy",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="privacy-policy"
              >
                <PrivacyPolicy />
              </CategoryProtectedRoute>
            ),
          },
          {
            path: "terms-of-service",
            element: (
              <CategoryProtectedRoute
                user={currentUser}
                routeName="terms-of-service"
              >
                <TermsOfService />
              </CategoryProtectedRoute>
            ),
          },
          {
            path: "forgot-password",
            element: <SettingsForgotPassword />,
          },
          {
            path: "change-password",
            element: <SettingsChangePassword />,
          },
          {
            path: "update-password",
            element: <SettingsUpdatePassword />,
          },
          {
            path: "otp-page",
            element: <SettingsOtpPage />,
          },
          {
            path: "logout",
            element: <Logout />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
        ],
      },
    ],
  },
]);

export default router;
