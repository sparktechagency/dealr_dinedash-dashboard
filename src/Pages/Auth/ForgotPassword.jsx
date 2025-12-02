import { Form, Input } from "antd";

import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { useForgetPasswordMutation } from "../../Redux/api/auth/authApi";
import RButton from "../../ui/RButton";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role?.[0] === "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, userExist]);
  const [forgetPassword] = useForgetPasswordMutation();

  const onFinish = async (values) => {
    const res = await tryCatchWrapper(
      forgetPassword,
      {
        body: values,
      },
      "Forgoting Password..."
    );

    if (res?.statusCode === 200) {
      Cookies.set("dealr_forget_password_token", res?.data?.attributes, {
        path: "/",
        expires: 1,
      });
      Cookies.set("dealr_email", values.email, {
        path: "/",
        expires: 1,
      });
      Cookies.remove("dealr_is_resend");
      form.resetFields();
      navigate("/forgot-password/verify-otp");
    }
  };

  return (
    <div className="bg-[#B7CDF5]">
      <div className="lg:w-[1100px] mx-auto flex justify-center items-center h-[100vh] lg:px-5 px-10">
        <div className="grid lg:grid-cols-12 items-center lg:gap-20">
          <div className="lg:col-span-6 w-full">
            <img
              src={AllImages.logo}
              alt="forgot_Password_Img"
              className="w-[450px]"
            />
          </div>

          <div className="lg:col-span-6 w-full">
            <div className="">
              <div className="">
                <h1 className="text-2xl sm:text-3xl font-medium text-start mb-6 mt-9 whitespace-nowrap flex gap-2">
                  <p>
                    <GoArrowLeft
                      onClick={handleBack}
                      className="cursor-pointer"
                    />
                  </p>
                  <p> Forgot password</p>
                </h1>
                <p className="lg:text-xl text-base mb-3">
                  Enter your email address to ger a verification code for
                  resetting your password.
                </p>
              </div>

              <Form
                layout="vertical"
                className="bg-transparent w-full"
                onFinish={onFinish}
              >
                <div>
                  <label className="text-base-color text-sm font-semibold block mb-2">
                    Email
                  </label>
                  <Form.Item
                    name="email"
                    className="text-base-color text-base font-medium"
                    rules={[
                      {
                        required: true,
                        message: "Email is Required",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your email"
                      className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                    />
                  </Form.Item>
                </div>
                <Form.Item>
                  <RButton
                    // isLoading={isLoading}
                    loadingMessage="Get OTP"
                    type={"submit"}
                    className="mt-5"
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
