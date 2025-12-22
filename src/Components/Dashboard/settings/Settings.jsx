import { RightOutlined } from "@ant-design/icons";
import { Divider, List } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Settings = () => {
  const { t } = useTranslation();
  const data = [
    { title: t("profile.changePassword"), to: "/admin/change-password" },
    { title: t("profile.privacyPolicy"), to: "/admin/privacy-policy" },
    { title: t("profile.termsAndPolicies"), to: "/admin/terms-of-service" },
  ];
  return (
    <div className="lg:w-[90%] w-full">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <Link to={item.to} key={index}>
            <List.Item>
              <List.Item.Meta
                title={
                  <span className="text-lg font-medium">{item.title}</span>
                }
              />
              <RightOutlined style={{ fontSize: 14, color: "#000" }} />
            </List.Item>

            <Divider style={{ margin: 0, borderColor: "#9E9E9E" }} />
          </Link>
        )}
      />
    </div>
  );
};

export default Settings;
