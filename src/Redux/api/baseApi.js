import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypes";
import { baseUrl } from "../../constant/baseUrl";
import Cookies from "js-cookie";

// 1️⃣ Create the baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/v1`,
  prepareHeaders: (headers) => {
    const token = Cookies.get("dealr_accessToken");
    const forgetPasswordToken = Cookies.get("dealr_forget_password_token");
    const resetPasswordToken = Cookies.get("dealr_resetPasswordToken");

    if (token) headers.set("authorization", `Bearer ${token}`);
    if (forgetPasswordToken) {
      headers.set("SignUpToken", `signUpToken ${forgetPasswordToken}`);
    }

    if (resetPasswordToken) {
      headers.set("Forget-password", `Forget-password ${resetPasswordToken}`);
    }

    return headers;
  },
});

// 2️⃣ Wrap it with auth check
const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status } = result.error;

    if (status === 403) {
      // clear tokens
      Cookies.remove("dealr_accessToken");
      window.location.href = "/sign-in";
      window.location.reload();
    }
  }

  return result;
};

// 3️⃣ Create the API
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuthCheck, // <-- use wrapped query here
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
