import { Checkbox, Form, Input } from "antd";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AllImages } from "../../../public/images/AllImages";
import RButton from "../../ui/RButton";
import { useLoginMutation } from "../../Redux/api/auth/authApi";
import useUserData from "../../hooks/useUserData";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();

  const [login] = useLoginMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role?.[0] === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values) => {
    const res = await tryCatchWrapper(
      login,
      { body: { ...values, role: "admin" } },
      "Signing In..."
    );
    console.log(res);
    if (
      res?.statusCode === 200 &&
      res?.data?.attributes?.user?.role?.[0] === "admin"
    ) {
      Cookies.set("dealr_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      window.location.reload();
    } else if (
      res?.statusCode === 200 &&
      res?.data?.attributes?.user?.role?.[0] !== "admin"
    ) {
      form.resetFields();
      toast.error("Access Denied", {
        duration: 2000,
      });
    }
  };
  return (
    <div className="bg-[#B7CDF5]">
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="grid lg:grid-cols-12 lg:gap-28">
          <div className="lg:col-span-5 w-full">
            <img
              loading="lazy"
              src={AllImages.logo}
              alt="logo"
              className="size-[450px]"
            />
          </div>
          <div className="lg:col-span-6 mx-auto w-full">
            <div className="flex flex-col  ">
              <div className=" ">
                <h1 className="text-2xl sm:text-3xl font-medium text-center mb-6">
                  Login to Account!
                </h1>
                <p className="lg:text-xl text-base mb-3">
                  Please enter your email and password to continue.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

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
              <div>
                <label className="text-base-color text-sm mb-2 block font-semibold">
                  Password
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
              <div className="flex justify-between items-center mt-6">
                <Checkbox className="text-[#1A1A1A] font-medium">
                  Remember me
                </Checkbox>
                <Link
                  to="/forgot-password"
                  className="text-[#185DDE] font-medium underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Form.Item>
                <RButton
                  // isLoading={isLoading}
                  loadingMessage="Sign in"
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
export default SignIn;
