import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
// import { useForgotPasswordMutation } from "../../../Redux/api/auth/authApi";
import { toast } from "sonner";
import { setToLocalStorage } from "../../../utils/local-storage";
import Spinner from "../../Shared/Spinner";

const SettingsForgotPassword = () => {
  // const [forgetPassword, { isLoading }] = useForgotPasswordMutation();
  // const navigate = useNavigate();

  const onFinish = async (values) => {
    // const toastId = toast.loading("Requesting...");
    // try {
    //   const res = await forgetPassword(values).unwrap();
    //   toast.success(res.message, {
    //     id: toastId,
    //     duration: 2000,
    //   });
    //   setToLocalStorage("forgotPasswordToken", JSON.stringify(values));
    //   navigate("/verify-otp");
    // } catch (error) {
    //   toast.error(error?.data?.message || "An error occurred during Login", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // }
  };
  return (
    <div
      className="container w-[90%] mx-auto min-h-[80vh] p-20 flex justify-center items-center"
      style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
    >
      <div className="w-full lg:w-[70%]">
        <div className="mb-10">
          <p className="text-3xl lg:text-[36px] text-base-color font-medium mb-8">
            Forgot Password
          </p>
          <p className="md:text-lg lg:text-xl text-base-color">
            Enter your email address to get a verification code for resetting
            your password.
          </p>
        </div>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent w-full"
        >
          <Typography.Title level={4} style={{ color: "#222222" }}>
            Email
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Email is Required",
              },
            ]}
            name="email"
            className="text-base-color "
          >
            <Input
              placeholder="Enter your mail"
              className="py-2 px-3 text-xl bg-site-color border border-white text-base-color "
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="w-full py-6 border !border-secondary-color hover:border-secondary-color text-xl !text-primary-color bg-secondary-color hover:!bg-secondary-color font-semibold rounded-2xl mt-8"
              htmlType="submit"
            >
              {/* {isLoading ? (
                <>
                  <Spinner size="small" />
                </>
              ) : (
                "Send OTP"
              )} */}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SettingsForgotPassword;
