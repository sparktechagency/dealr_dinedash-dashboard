import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const potentialDealerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCommunicatrion: build.mutation({
      query: (req) => ({
        url: `/communicatrion/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.potentialDealer],
    }),
    getCommunicatrion: build.query({
      query: ({ page = 1, limit = 100000 }) => {
        return {
          url: `/communicatrion/all`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.potentialDealer],
    }),
    addPotentialDealer: build.mutation({
      query: (req) => ({
        url: `/potentialdealer/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.potentialDealer],
    }),
    getPotentialDealer: build.query({
      query: ({ page = 1, limit = 100000 }) => {
        return {
          url: `/potentialdealer/all`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.potentialDealer],
    }),
    getAllCommunicatrionStatus: build.query({
      query: () => ({
        url: `/communicatrion/count`,
        method: "GET",
      }),
      providesTags: [tagTypes.potentialDealer],
    }),
    // updateCity: build.mutation({
    //   query: (req) => ({
    //     url: `/city/edit/${req?.params}`,
    //     method: "PUT",
    //     body: req?.body,
    //   }),
    //   invalidatesTags: [tagTypes.potentialDealer],
    // }),
    // deleteCity: build.mutation({
    //   query: (req) => ({
    //     url: `/city/${req?.params}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.potentialDealer],
    // }),
  }),
});

export const {
  useAddCommunicatrionMutation,
  useGetCommunicatrionQuery,
  useAddPotentialDealerMutation,
  useGetPotentialDealerQuery,
  useGetAllCommunicatrionStatusQuery,
} = potentialDealerApi;

export default potentialDealerApi;
