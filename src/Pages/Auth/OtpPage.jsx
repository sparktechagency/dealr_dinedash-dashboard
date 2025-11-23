import { Form } from "antd";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AllImages, AuthImages } from "../../../public/images/AllImages";
import RButton from "../../ui/RButton";
import useUserData from "../../hooks/useUserData";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role?.[0] === "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, userExist]);
  // const [forgotOtpVerification, { isLoading }] =
  //   useForgotOtpVerificationMutation();
  // const navigate = useNavigate();
  // let token = localStorage.getItem("forgotPasswordToken");
  // const { user } = jwtDecode(token);

  // useEffect(() => {
  //   console.log(user, "decodeToken");
  //   if (!token) {
  //     navigate("/forgot-password");
  //   }
  // }, [navigate, token, user]);

  const onFinish = async () => {
    // const toastId = toast.loading("Verifying...");
    // if (otp.length < 6) {
    //   toast.error("The OTP must be 6 digits long", {
    //     id: toastId,
    //     duration: 2000,
    //   });
    // } else {
    //   // const data = {
    //   //   email: user.email,
    //   //   otp: Number(otp),
    //   // };
    //   try {
    //     // const res = await forgotOtpVerification(data).unwrap();
    //     toast.success("Email verified successfully", {
    //       id: toastId,
    //       duration: 2000,
    //     });
    //     // localStorage.setItem(
    //     //   "resetPasswordToken",
    //     //   res.data?.resetPasswordToken
    //     // );
    //     navigate("/update-password");
    //   } catch (error) {
    //     toast.error(error?.data?.message || "An error occurred during login", {
    //       id: toastId,
    //       duration: 3000,
    //     });
    //   }
    // }
  };

  return (
    <div className="bg-[#B7CDF5]">
      <div className="container mx-auto h-screen flex items-center justify-center">
        <div className="grid lg:grid-cols-12 lg:gap-28 items-center">
          <div className="lg:col-span-5 w-full">
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
                  Verify OTP
                </h1>
                <p className="lg:text-xl text-base mb-3 lg:w-[450px]">
                  Please check your email. We have sent a code to contact
                  @gmail.com
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={onFinish}
            >
              <Form.Item className="">
                <div className="flex justify-start items-center">
                  <OTPInput
                    inputStyle="!size-12 flex rounded-xl bg-transparent border mr-4 border-[#185DDE] focus:border-[#185DDE] focus:shadow-none"
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>
              <div className="flex justify-between py-1">
                <p>Didn’t receive code?</p>
                <Link
                  href="/otp-verification"
                  className="!underline font-semibold"
                >
                  Resend
                </Link>
              </div>

              <Form.Item>
                <RButton
                  // isLoading={isLoading}
                  loadingMessage="Verify"
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
export default OtpPage;
