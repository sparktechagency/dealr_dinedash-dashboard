import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const auth_url = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (req) => ({
        url: `${auth_url}/signin`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetPassword: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/forget-password`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    resendForgetOTP: build.mutation({
      query: (req) => {
        return {
          url: `auth/resend-otp`,
          method: "POSt",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    forgetOtpVerify: build.mutation({
      query: (req) => {
        return {
          url: `/auth/verify-otp`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: build.mutation({
      query: (req) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
    changePassword: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/change-password`,
          method: "PATCH",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResendForgetOTPMutation,
  useForgetOtpVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;
