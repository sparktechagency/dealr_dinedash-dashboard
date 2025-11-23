import { baseApi } from "../baseApi";

const regionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegion: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/region`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["region"],
    }),

    createRegion: builder.mutation({
      query: (payload) => ({
        url: `/region/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["region"],
    }),

    updateRegion: builder.mutation({
      query: ({ id, formData }) => {
        return {
          url: `/region/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["region"],
    }),

    deleteRegion: builder.mutation({
      query: ({ id }) => ({
        url: `/region/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["region"],
    }),
  }),
});

export const {
  useGetAllRegionQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = regionApi;
