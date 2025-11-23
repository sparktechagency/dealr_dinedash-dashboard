import { baseApi } from "../baseApi";

const subScriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/subscription`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["subscription"],
    }),

    createSubscription: builder.mutation({
      query: (payload) => ({
        url: `/subscription/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["subscription"],
    }),

    updateSubscription: builder.mutation({
      query: (data) => ({
        url: `/subscription/${data.id}`,
        method: "PATCH",
        body: data.newSubscription,
      }),
      invalidatesTags: ["subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: (data) => {
        return {
          url: `/subscription/${data}`, // Assuming 'data' is the ID of the subscription
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
  useDeleteSubscriptionMutation,
} = subScriptionApi;
