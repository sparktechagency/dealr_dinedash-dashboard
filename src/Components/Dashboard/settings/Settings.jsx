import { RightOutlined } from "@ant-design/icons";
import { Divider, List } from "antd";
import { Link } from "react-router-dom";

const data = [
  { title: "Change Password", to: "/admin/change-password" },
  { title: "Privacy Policy", to: "/admin/privacy-policy" },
  { title: "Terms & Policies", to: "/admin/terms-of-service" },
];

const Settings = () => {
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
