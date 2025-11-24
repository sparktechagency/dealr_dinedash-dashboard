import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypes";
import { getFromLocalStorage } from "../../utils/local-storage";
import { baseUrl } from "../../constant/baseUrl";
import Cookies from "js-cookie";

// 1️⃣ Create the baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/v1`,
  prepareHeaders: (headers) => {
    const token = Cookies.get("dealr_accessToken");
    const resetPasswordToken = getFromLocalStorage("resetPasswordToken");
    const forgotPasswordToken = getFromLocalStorage("forgotPasswordToken");

    if (token) headers.set("authorization", `Bearer ${token}`);
    if (forgotPasswordToken)
      headers.set(
        "authorization",
        `forgotPasswordToken ${forgotPasswordToken}`
      );
    if (resetPasswordToken)
      headers.set("authorization", `resetPasswordToken ${resetPasswordToken}`);

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
