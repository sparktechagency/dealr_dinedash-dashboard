import { EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { RiEyeCloseLine } from "react-icons/ri";
import Cookies from "js-cookie";
import { GoArrowLeft } from "react-icons/go";
import { useChangePasswordMutation } from "../../../Redux/api/auth/authApi";
import Spinner from "../../Shared/Spinner";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useNavigate } from "react-router-dom";

const SettingsChangePassword = () => {
  const navigate = useNavigate();
  const [updatePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.confirmPassword,
    };

    const res = await tryCatchWrapper(
      updatePassword,
      { body: data },
      "Changing Password..."
    );
    if (res?.statusCode === 200) {
      Cookies.remove("dealr_accessToken");

      window.location.href = "/sign-in";
      window.location.reload();
    }
  };

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <div>
      <div className="lg:w-[700px] lg:px-6 px-4 py-6">
        <h1 className="text-2xl sm:text-3xl font-medium text-start mb-6 mt-9 whitespace-nowrap flex items-center gap-2">
          <p>
            <GoArrowLeft onClick={handleBack} className="cursor-pointer" />
          </p>
          <p>Change Password</p>
        </h1>
        <div className="w-full">
          <Form
            onFinish={onFinish}
            layout="vertical"
            className="bg-transparent w-full"
          >
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Current password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
              name="oldPassword"
              className="text-white "
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined />
                  ) : (
                    <RiEyeCloseLine className="cursor-pointer" />
                  )
                }
                placeholder="***********"
                className="px-4 bg-transparent cursor-pointer py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              New password
            </Typography.Title>
            <Form.Item
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
              name="newPassword"
              className="text-white"
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined />
                  ) : (
                    <RiEyeCloseLine className="cursor-pointer" />
                  )
                }
                placeholder="***********"
                className="px-4 bg-transparent py-3 rounded-xl cursor-pointer border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Confirm new Password
            </Typography.Title>
            <Form.Item
              name="confirmPassword"
              className="text-white"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <EyeOutlined />
                  ) : (
                    <RiEyeCloseLine className="cursor-pointer" />
                  )
                }
                placeholder="***********"
                className="px-4 bg-transparent cursor-pointer py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full h-11 mt-6 rounded-xl bg-[#185DDE] hover:!bg-[#185DDEba] transition-colors duration-300 border-none !text-white hover:!border-none font-medium"
                htmlType="submit"
              >
                {isLoading ? <Spinner size="small" /> : "Update Password"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SettingsChangePassword;
