import { Form } from "antd";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

import { AllImages } from "../../../public/images/AllImages";
import RButton from "../../ui/RButton";
import useUserData from "../../hooks/useUserData";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useForgetOtpVerifyMutation,
  useResendForgetOTPMutation,
} from "../../Redux/api/auth/authApi";
import Cookies from "js-cookie";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role?.[0] === "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, userExist]);
  const [otpMatch] = useForgetOtpVerifyMutation();
  // const [otpMatchAfterResend] = useForgetOtpVerifyAfterResendMutation();
  const [resendOtp] = useResendForgetOTPMutation();
  const email = Cookies.get("dealr_email");
  const resend = Cookies.get("dealr_is_resend");

  const handleOTPSubmit = async () => {
    // if (resend) {
    //   if (otp.length === 6) {
    //     const res = await tryCatchWrapper(
    //       otpMatchAfterResend,
    //       {
    //         body: {
    //           otp: otp,
    //         },
    //       },
    //       "Verifying..."
    //     );
    //     if (res?.statusCode === 200) {
    //       setOtp("");
    //       Cookies.set(
    //         "dealr_resetPasswordToken",
    //         res?.data?.forgetPasswordToken,
    //         {
    //           path: "/",
    //           expires: 1,
    //         }
    //       );
    //       Cookies.remove("dealr_is_resend");
    //       Cookies.remove("dealr_email");
    //       Cookies.remove("dealr_forget_password_token");
    //       navigate("/update-password");
    //     }
    //   }
    // } else {
    if (otp.length === 4) {
      const res = await tryCatchWrapper(
        otpMatch,
        {
          body: {
            otp: otp,

            purpose: resend ? "resend-otp" : "forget-password",
          },
        },
        "Verifying..."
      );
      if (res?.statusCode === 200) {
        setOtp("");
        Cookies.set(
          "dealr_resetPasswordToken",
          res?.data?.forgetPasswordToken,
          {
            path: "/",
            expires: 1,
          }
        );
        Cookies.remove("dealr_is_resend");
        Cookies.remove("dealr_email");
        Cookies.remove("dealr_forget_password_token");
        navigate("/update-password");
      }
    }
    // }
  };

  const handleResendOtp = async () => {
    const res = await tryCatchWrapper(
      resendOtp,
      {
        body: {
          email,
        },
      },
      "Sending OTP..."
    );

    if (res?.statusCode === 200) {
      Cookies.set("dealr_is_resend", "true", {
        path: "/",
        expires: 1,
      });
    }
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
                  {email}.
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}

            <Form
              layout="vertical"
              className="bg-transparent w-full"
              onFinish={handleOTPSubmit}
            >
              <Form.Item className="">
                <div className="flex justify-start items-center">
                  <OTPInput
                    inputStyle="!size-12 flex rounded-xl bg-transparent border mr-4 border-[#185DDE] focus:border-[#185DDE] focus:shadow-none"
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>
              <div className="flex justify-between py-1">
                <p>Didn’t receive code?</p>
                <div
                  onClick={handleResendOtp}
                  className="!underline font-semibold"
                >
                  Resend
                </div>
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
