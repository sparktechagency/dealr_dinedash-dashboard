import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const dealsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allDealCards: build.query({
      query: () => {
        return {
          url: `/udm/card`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.city],
    }),
    mostPopularDeals: build.query({
      query: () => {
        return {
          url: `/deal/top-deals`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.city],
    }),
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
    getAllBusiness: build.query({
      query: () => {
        return {
          url: `/business/allbusiness`,
          method: "GET",
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
    updateDeal: build.mutation({
      query: (req) => ({
        url: `/deal/editBy-admin/${req?.params}`,
        method: "PUT",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),
    deleteDeal: build.mutation({
      query: (req) => ({
        url: `/deal/deleteby-admin/${req?.params}`,
        method: "DELETE",
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
    approvedDeal: build.mutation({
      query: (req) => ({
        url: `/deal/approve-deal/${req?.params}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.city],
    }),
    declinedDealRequest: build.mutation({
      query: (req) => ({
        url: `/deal/reject-change/${req?.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.city],
    }),
    allChangeRequest: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/deal/all-change-req`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.city],
    }),
    approvedChangeRequest: build.mutation({
      query: (req) => ({
        url: `/deal/deal-req-approve/${req?.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.city],
    }),
    declinedChangeRequest: build.mutation({
      query: (req) => ({
        url: `/deal/reject-change/${req?.params}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.city],
    }),
    allRedemtionTrend: build.query({
      query: ({ year }) => {
        return {
          url: `/deal/redemption-trend`,
          method: "GET",
          params: {
            year,
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
  useAllDealCardsQuery,
  useMostPopularDealsQuery,
  useAllRedemtionTrendQuery,
  useAllApprovedDealQuery,
  useGetAllBusinessQuery,
  useAddDealMutation,
  useUpdateDealMutation,
  useDeleteDealMutation,
  useAllPendingDealQuery,
  useApprovedDealMutation,
  useDeclinedDealRequestMutation,
  useAllChangeRequestQuery,
  //   useAddCityMutation,
  //   useGetCityQuery,
  //   useUpdateCityMutation,
  //   useDeleteCityMutation,
} = dealsApi;

export default dealsApi;
