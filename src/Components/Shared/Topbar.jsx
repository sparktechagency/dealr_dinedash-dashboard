import { BarsOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, Grid, Menu, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllNotificationsQuery } from "../../Redux/api/user/userApi";
import Spinner from "./Spinner";
import { FaLanguage } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../utils/i18n";
// import user from "/images/user.png";

const { useBreakpoint } = Grid;

// eslint-disable-next-line react/prop-types
const Topbar = ({ collapsed, setCollapsed }) => {
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);
  const { t } = useTranslation();

  const { data, isLoading, refetch } = useGetAllNotificationsQuery(
    [
      { name: "limit", value: pageSize },
      { name: "page", value: currentPage },
    ],
    {
      refetchOnMountOrArgChange: open,
    }
  );

  const notification = data?.data?.attributes?.notification;

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    if (screens.lg || screens.xl) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [screens, setCollapsed]);

  const handleDropdownVisibleChange = (visible) => {
    setDropdownVisible(visible);

    if (visible) {
      refetch(); // 🔥 this will refetch notifications
    }
  };
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("dealr-lang", lng); // ⭐ save it
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="en" onClick={() => changeLanguage("en")}>
        {t("English")}
      </Menu.Item>
      <Menu.Item key="de" onClick={() => changeLanguage("de")}>
        {t("Deutsch")}
      </Menu.Item>
    </Menu>
  );

  if (isLoading) {
    return <Spinner />;
  }

  const notificationMenu = (
    <div className="w-80 p-4 max-h-min bg-white rounded-lg shadow-lg border lg:h-[650px] overflow-hidden overflow-y-auto scrollbar">
      <p className="text-2xl font-semibold mb-2 text-center text-[#185DDE] pb-2 border-b border-[#185DDE]">
        Notifications
      </p>
      {notification?.map((not) => (
        <div
          key={not._id}
          className="flex items-center gap-2 py-2 border-b border-[#B7CDF5] last:border-b-0"
        >
          <BellOutlined
            style={{
              color: "#185DDE",
              fontSize: "20px",
              backgroundColor: "#B7CDF5",
              width: "35px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
            }}
          />
          <div className="flex flex-col items-start">
            <p>{i18n.language === "de" ? not.message?.de : not.message?.en}</p>
            <p className="text-gray-400 text-sm">
              {moment(not.createdAt).fromNow()}
            </p>
          </div>
        </div>
      ))}
      <div className="text-center mt-4">
        <Link
          to="/admin/notifications"
          className="bg-[#185DDE] text-white hover:text-gray-200 px-4 py-2 rounded inline-block"
        >
          See More
        </Link>
      </div>
    </div>
  );

  return (
    <div className="py-2 mx-[-50px] flex justify-between items-center bg-[#ffffff] rounded-xl">
      <div className="flex items-center gap-2 text-base-color ml-4 mt-2">
        <Typography.Title level={3} type="secondary">
          <BarsOutlined
            onClick={() => setCollapsed(!collapsed)}
            className="text-4xl text-[#185DDE] mt-[2px]"
          />
        </Typography.Title>
      </div>
      <div className="flex items-center justify-center gap-3 mr-5">
        {/* notification */}

        <Dropdown overlay={languageMenu} placement="bottomRight">
          <Button
            type="text"
            icon={<FaLanguage className="text-xl" />}
            className="flex items-center"
          >
            {i18n.language === "de" ? "GR" : "EN"}
          </Button>
        </Dropdown>

        <div className="border border-[#185DDE] rounded-full px-2 py-2 h-9 flex cursor-pointer">
          <ConfigProvider
            theme={{
              components: {
                Badge: {
                  colorError: "#185DDE",
                },
              },
            }}
          >
            <Dropdown
              overlay={notificationMenu}
              trigger={["hover"]}
              placement="bottomRight"
              onOpenChange={handleDropdownVisibleChange}
              open={isDropdownVisible}
            >
              <BellOutlined
                shape="circle"
                size="small"
                className="text-xl font-bold text-[#185DDE]"
              />
            </Dropdown>
          </ConfigProvider>
        </div>

        <Link
          to="profile"
          className="flex items-center justify-center text-center gap-2 bg-transparent border rounded-full border-[#185DDE] p-2 mr-5"
        >
          <UserOutlined className="text-xl text-[#185DDE]" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
