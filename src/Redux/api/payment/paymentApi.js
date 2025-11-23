import { baseApi } from "../baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentList: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/payment/payment_list`,
          method: "GET",
          params: params,
        };
      },
    }),

    getAllEarning: builder.query({
      query: () => ({
        url: `/payment/payment_list`,
        method: "GET",
      }),
    }),

    getTodaysEarning: builder.query({
      query: () => ({
        url: `/payment-requests/todays_earning`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPaymentListQuery,
  useGetAllEarningQuery,
  useGetTodaysEarningQuery,
} = paymentApi;
