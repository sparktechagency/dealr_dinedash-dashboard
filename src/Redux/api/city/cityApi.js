import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const cityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCity: build.mutation({
      query: (req) => ({
        url: `/city/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),
    getCity: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/city/all`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.city],
    }),
    updateCity: build.mutation({
      query: (req) => ({
        url: `/city/edit/${req?.params}`,
        method: "PUT",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),
    deleteCity: build.mutation({
      query: (req) => ({
        url: `/city/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.city],
    }),
  }),
});

export const {
  useAddCityMutation,
  useGetCityQuery,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = cityApi;

export default cityApi;
