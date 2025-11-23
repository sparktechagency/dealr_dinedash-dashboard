import settings from "../../../public/images/dashboard-logo/Setting.svg";
import earning from "../../../public/images/dashboard-logo/Wallet.svg";
import blogs from "../../../public/images/dashboard-logo/blog.svg";
import category from "../../../public/images/dashboard-logo/category.svg";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import profile from "../../../public/images/dashboard-logo/profile.svg";
import recipe from "../../../public/images/dashboard-logo/recipe.svg";
import region from "../../../public/images/dashboard-logo/region.svg";
import subscription from "../../../public/images/dashboard-logo/subscription.svg";
import users from "../../../public/images/dashboard-logo/users.svg";

import Topbar from "../Shared/Topbar";

import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop();
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

  const handleLogout = () => {
    Cookies.remove("dealr_accessToken");
    window.location.href = "/sign-in";
    window.location.reload();
  };

  // Use effect to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adminMenuItems = [
    {
      key: "dashboard",
      icon: (
        <img
          src={dashboardLogo}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("dashboard")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="dashboard">{t("sidebar.dashboard")}</NavLink>,
    },
    {
      key: "customers",
      icon: (
        <img
          src={users}
          alt="dashboard"
          width={20}
          style={{
            filter: location.pathname.includes("customers")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="customers">{t("sidebar.customers")}</NavLink>,
    },
    {
      key: "dealer",
      icon: <img src={recipe} alt="dealer" width={20} />,
      label: <span className="">{t("sidebar.dealers")}</span>,
      children: [
        {
          key: "all-dealer",
          icon: <span className="text-[#185DDE]">&#8226;</span>,
          label: <NavLink to="all-dealer">{t("sidebar.allDealers")}</NavLink>,
        },
        {
          key: "dealer-request",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="dealer-request">{t("sidebar.dealerRequest")}</NavLink>
          ),
        },
      ],
    },
    {
      key: "potentials_dealer",
      icon: (
        <img
          src={blogs}
          alt="blogs"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("potentials_dealer")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: (
        <NavLink to="potentials_dealer">
          {t("sidebar.potentialsDealer")}
        </NavLink>
      ),
    },
    {
      key: "deals",
      icon: <img src={recipe} alt="deals" width={20} />,
      label: <span className="">{t("sidebar.deals")}</span>,
      children: [
        {
          key: "all-deals",
          icon: <span className="text-[#185DDE]">&#8226;</span>,
          label: <NavLink to="all-deals">{t("sidebar.allDeals")}</NavLink>,
        },
        {
          key: "deals-analytics",
          icon: <span>&#8226;</span>,
          label: (
            <NavLink to="deals-analytics">
              {t("sidebar.dealsAnalytics")}
            </NavLink>
          ),
        },
      ],
    },
    {
      key: "cities",
      icon: (
        <img
          src={category}
          alt="cities"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("cities")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="cities">{t("sidebar.cities")}</NavLink>,
    },

    {
      key: "subscription",
      icon: (
        <img
          src={subscription}
          alt="subscription"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("subscription")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="subscription">{t("sidebar.subscription")}</NavLink>,
    },
    {
      key: "earning",
      icon: (
        <img
          src={earning}
          alt="earning"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("earning")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="earning">{t("sidebar.earnings")}</NavLink>,
    },

    {
      key: "employees",
      icon: (
        <img
          src={region}
          alt="employees"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("employees")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="employees">{t("sidebar.employees")}</NavLink>,
    },

    {
      key: "profile",
      icon: (
        <img
          src={profile}
          alt="profile"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("profile")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="profile">{t("sidebar.profile")}</NavLink>,
    },
    {
      key: "settings",
      icon: (
        <img
          src={settings}
          alt="settings"
          width={16}
          height={16}
          style={{
            filter: location.pathname.includes("settings")
              ? "brightness(0) invert(1)"
              : undefined,
          }}
        />
      ),
      label: <NavLink to="setting">{t("sidebar.settings")}</NavLink>,
    },
    {
      key: "logout",
      icon: (
        <img
          src={logout}
          alt="logout"
          width={16}
          height={16}
          style={{ color: "#222222", fontSize: "16px" }}
        />
      ),
      label: (
        <div
          onClick={() => {
            handleLogout();
          }}
        >
          {t("sidebar.logout")}
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen bg-[#B7CDF5] ">
      <Layout className="!relative !bg-[#B7CDF5] ">
        <Sider
          width={350}
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#fff",
            position: "sticky",
            top: "10px",
            height: "98vh",
            overflowY: "auto",
            border: "2px solid #185DDE",
            marginLeft: "20px",
            marginTop: "10px",
            borderRadius: "10px",
          }}
          className=""
        >
          <Link to="">
            <img
              src={AllImages.logo}
              alt="logo"
              width={150}
              height={150}
              className="my-7 mx-auto"
            />
          </Link>

          <Menu
            mode="inline"
            defaultSelectedKeys={pathSegment}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingTop: "20px",
              paddingBottom: "20px",
              color: "#185DDE",
              paddingRight: "6px",
            }}
            items={adminMenuItems}
          />
        </Sider>
        <Layout style={{ background: "#B7CDF5", padding: "0px 20px" }}>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: "10px",
              zIndex: 999,
              height: "80px",
              border: "2px solid #185DDE",
              borderRadius: "10px",
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-[#B7CDF5] py-4 xl:py-8">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
