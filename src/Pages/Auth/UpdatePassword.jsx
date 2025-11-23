import { Form, Input } from "antd";

import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
// import { useResetPasswordMutation } from "../../Redux/api/auth/authApi";
import RButton from "../../ui/RButton";
import { useEffect } from "react";
import useUserData from "../../hooks/useUserData";

const ChangePassword = () => {
  const navigate = useNavigate();
  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role?.[0] === "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, userExist]);

  // const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // let token = localStorage.getItem("resetPasswordToken");

  // const { user } = jwtDecode(token);

  // useEffect(() => {
  //   if (!user && !token) {
  //     navigate("/forget-password");
  //   }
  // }, [navigate, user, token]);

  const onFinish = async (values) => {
    // const toastId = toast.loading("Updating Password...");
    // const value = {
    //   password: values.password,
    //   confirmPassword: values.confirmPassword,
    // };
    // try {
    //   const res = await resetPassword(value).unwrap();
    //   toast.success(res.message, {
    //     id: toastId,
    //     duration: 2000,
    //   });
    //   setTimeout(() => {
    //     localStorage.removeItem("forgotPasswordToken");
    //   }, 2000);
    //   setTimeout(() => {
    //     localStorage.removeItem("resetPasswordToken");
    //   }, 2000);
    //   navigate("/signin");
    // } catch (error) {
    //   toast.error(
    //     error?.data?.message ||
    //       error?.message ||
    //       "An error occurred during Login",
    //     {
    //       id: toastId,
    //       duration: 2000,
    //     }
    //   );
    // }
  };

  return (
    <div className="bg-[#B7CDF5]">
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="grid lg:grid-cols-12 lg:gap-28 items-center">
          <div className="lg:col-span-5  w-full">
            <img
              loading="lazy"
              src={AllImages.logo}
              alt="logo"
              className="w-[450px]"
            />
          </div>
          <div className="lg:col-span-6 mx-auto w-full">
            <div className="flex flex-col  ">
              <div className=" ">
                <h1 className="text-2xl sm:text-3xl font-medium mb-6">
                  Set new password
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <div>
                <label className="text-base-color text-sm mb-2 block font-semibold">
                  New Password
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Password is Required",
                    },
                  ]}
                  name="password"
                  className="text-base-color text-base font-medium"
                >
                  <Input.Password
                    placeholder="*********"
                    className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                  />
                </Form.Item>
              </div>
              <div>
                <label className="text-base-color text-sm mb-2 block font-semibold">
                  Confirm New Password
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Confirm Password  is Required",
                    },
                  ]}
                  name="confirmPassword"
                  className="text-base-color text-base font-medium"
                >
                  <Input.Password
                    placeholder="*********"
                    className="px-4 py-3 rounded-xl border-gray-300 hover:border-[#185DDE] focus:border-[#185DDE] focus:outline-none"
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <RButton
                  // isLoading={isLoading}
                  loadingMessage="Reset Password"
                  type={"submit"}
                  className="mt-10"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
