import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTransaction: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/transaction/all`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.transaction],
    }),
  }),
});

export const { useGetTransactionQuery } = transactionApi;

export default transactionApi;
