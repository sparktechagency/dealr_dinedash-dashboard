import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const dealTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allDealType: build.query({
      query: () => {
        return {
          url: `/deal-type/all`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.city],
    }),

    addDealType: build.mutation({
      query: (req) => ({
        url: `/deal-type/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),

    deleteDealType: build.mutation({
      query: (req) => ({
        url: `/deal-type/${req?.params}`,
        method: "DELETE",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.city],
    }),
  }),
});

export const {
  useAllDealTypeQuery,
  useAddDealTypeMutation,
  useDeleteDealTypeMutation,
} = dealTypeApi;

export default dealTypeApi;
