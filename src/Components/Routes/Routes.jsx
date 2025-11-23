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

const router = createBrowserRouter([
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "",
    element: <Main />,
    // errorElement: <Error />,
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
        path: "verify-otp",
        element: <OtpPage />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
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
            element: <Customers />,
          },
          {
            path: "all-dealer",
            element: <AllDealers />,
          },
          {
            path: "dealer-details/:id",
            element: <RecipeDetails />,
          },
          {
            path: "dealer-request",
            element: <DealerRequest />,
          },
          {
            path: "potentials_dealer",
            element: <PotentialsDealer />,
          },
          {
            path: "dealer-request/:id",
            element: <RecipeRequestDetails />,
          },
          {
            path: "all-deals",
            element: <AllDeals />,
          },
          {
            path: "deals-analytics",
            element: <DealAnalytics />,
          },
          {
            path: "cities",
            element: <City />,
          },
          {
            path: "employees",
            element: <Employee />,
          },
          {
            path: "earning",
            element: <Earning />,
          },
          {
            path: "subscription",
            element: <Subscription />,
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
            element: <PrivacyPolicy />,
          },
          {
            path: "terms-of-service",
            element: <TermsOfService />,
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
