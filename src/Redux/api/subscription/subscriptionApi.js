import { baseApi } from "../baseApi";

const subScriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => {
        const params = new URLSearchParams();
        // args?.forEach((item) => {
        //   params.append(item.name, item.value);
        // });

        return {
          url: `/subscription/admin/all`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["subscription"],
    }),

    createSubscription: builder.mutation({
      query: (payload) => ({
        url: `/subscription/add`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["subscription"],
    }),

    updateSubscription: builder.mutation({
      query: (data) => ({
        url: `/subscription/edit/${data.id}`,
        method: "PUT",
        body: data.newSubscription,
      }),
      invalidatesTags: ["subscription"],
    }),

    toggleSubscriptionStatus: builder.mutation({
      query: (req) => ({
        url: `/subscription/toggle/${req.params}`,
        method: "PATCH",
      }),
      invalidatesTags: ["subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: (req) => {
        return {
          url: `/subscription/${req.params}`, // Assuming 'data' is the ID of the subscription
          method: "DELETE",
        };
      },
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useToggleSubscriptionStatusMutation,
  useDeleteSubscriptionMutation,
} = subScriptionApi;
