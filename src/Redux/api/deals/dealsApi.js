import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const dealsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allApprovedDeal: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/deal/all-approved`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.city],
    }),
    addDeal: build.mutation({
      query: (req) => ({
        url: `/deal/add-byadmin`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),
    allPendingDeal: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/deal/pending-deals`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.city],
    }),

    // updateCity: build.mutation({
    //   query: (req) => ({
    //     url: `/city/edit/${req?.params}`,
    //     method: "PUT",
    //     body: req?.body,
    //   }),
    //   invalidatesTags: [tagTypes.city],
    // }),
    // deleteCity: build.mutation({
    //   query: (req) => ({
    //     url: `/city/${req?.params}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.city],
    // }),
  }),
});

export const {
  useAllApprovedDealQuery,
  useAddDealMutation,
  useAllPendingDealQuery,
  //   useAddCityMutation,
  //   useGetCityQuery,
  //   useUpdateCityMutation,
  //   useDeleteCityMutation,
} = dealsApi;

export default dealsApi;
