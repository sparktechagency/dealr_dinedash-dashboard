import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const promotionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addPromotion: build.mutation({
      query: (req) => ({
        url: `/quots/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
    getPromotion: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/quots/all`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.promotion],
    }),
    updatePromotion: build.mutation({
      query: (req) => ({
        url: `/quots/edit/${req?.params}`,
        method: "PUT",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
    deletePromotion: build.mutation({
      query: (req) => ({
        url: `/quots/delete/${req?.params}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.promotion],
    }),
  }),
});

export const {
  useAddPromotionMutation,
  useGetPromotionQuery,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} = promotionApi;

export default promotionApi;
