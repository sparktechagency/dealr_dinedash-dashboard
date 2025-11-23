import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRatioOfUsers: builder.query({
      query: (year) => {
        console.log(year.year, "year in redux");

        return {
          url: `/users/user_ratio?year=${year.year}`,
        };
      },
    }),
  }),
});

export const { useGetRatioOfUsersQuery } = dashboardApi;
