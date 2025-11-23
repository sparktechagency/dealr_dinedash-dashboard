import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypes";
import { getFromLocalStorage } from "../../utils/local-storage";
import { baseUrl } from "../../constant/baseUrl";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/v1`,
    prepareHeaders: (headers) => {
      const token = Cookies.get("dealr_accessToken");
      const resetPasswordToken = getFromLocalStorage("resetPasswordToken");
      const forgotPasswordToken = getFromLocalStorage("forgotPasswordToken");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      if (forgotPasswordToken) {
        headers.set(
          "authorization",
          `forgotPasswordToken ${forgotPasswordToken}`
        );
      }

      if (resetPasswordToken) {
        headers.set(
          "authorization",
          `resetPasswordToken ${resetPasswordToken}`
        );
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
