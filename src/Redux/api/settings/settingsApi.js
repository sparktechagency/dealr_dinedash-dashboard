import { baseApi } from "../baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStaticContent: builder.mutation({
      query: (payload) => ({
        url: `/static_content/create`,
        method: "POST",
        body: payload,
      }),
    }),
    getAllStaticContent: builder.query({
      query: () => ({
        url: `/static_content`,
        method: "GET",
      }),
    }),
    getAllNotifications: builder.query({
      query: () => ({
        url: `/notifications/notification-adminend`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateStaticContentMutation,
  useGetAllStaticContentQuery,
  useGetAllNotificationsQuery,
} = settingsApi;
