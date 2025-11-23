import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: `/users/user-details`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),

    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/users/all_users`,
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.user],
    }),

    blockUser: builder.mutation({
      query: (userId) => {
        return {
          url: `/users/block_user`,
          method: "PATCH",
          body: userId,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    getAllNotifications: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/notification`,
          method: "GET",
          params: params,
        };
      },
      //   providesTags: [tagTypes.user],
    }),

    deleteDriverRequest: builder.mutation({
      query: (id) => ({
        url: `/users/delete_driver/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DriverRequest"],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetMyProfileQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useGetAllNotificationsQuery,
  useDeleteDriverRequestMutation,
} = userApi;
