import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCounts: builder.query({
      query: (period) => {
        return {
          url: `users/counts?period=${period}`,
        };
      },
    }),
    getDownloadsAndSubscriptionUsers: builder.query({
      query: (year) => {
        return {
          url: `/users/ratio?type=monthly&year=${year}`,
        };
      },
    }),
    getRatioOfUsers: builder.query({
      query: (year) => {
        console.log(year.year, "year in redux");

        return {
          url: `/mysubscription/lost-sub-ratio?year=${year.year}`,
        };
      },
    }),
    sendNotification: builder.mutation({
      query: (req) => {
        return {
          url: `/notifications/add`,
          method: "POST",
          body: req?.body,
        };
      },
    }),
  }),
});

export const {
  useGetCountsQuery,
  useGetDownloadsAndSubscriptionUsersQuery,
  useGetRatioOfUsersQuery,
  useSendNotificationMutation,
} = dashboardApi;
