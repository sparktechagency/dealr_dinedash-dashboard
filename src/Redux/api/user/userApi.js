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
        const filter = new URLSearchParams();

        if (args && Array.isArray(args)) {
          args.forEach((item) => {
            filter.append(item.name, item.value);
          });
        }

        return {
          url: `/users/all`,
          method: "GET",
          params: filter,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getSpacificUser: builder.query({
      query: (id) => ({
        url: `/users/dealer-details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    editProfileAsAdmin: builder.mutation({
      query: (req) => ({
        url: `/users/edit/${req.params}`,
        method: "PUT",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    blockAndUnblockUser: builder.mutation({
      query: (req) => ({
        url: `/users/banUnban/${req.params}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    makeDealer: builder.mutation({
      query: ({ params }) => ({
        url: `/users/make-dealer/${params}`,
        method: "PUT",
      }),
      invalidatesTags: [tagTypes.user],
    }),

    allDealerRequest: builder.query({
      query: ({ page, limit }) => ({
        url: `/users/dealer-req?role=business`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["DealerRequest"],
    }),

    acceptDealerRequest: builder.mutation({
      query: (req) => ({
        url: `/users/accept-dealerReq/${req.params}`,
        method: "PUT",
      }),
      invalidatesTags: ["DealerRequest"],
    }),
    declineDealerRequest: builder.mutation({
      query: (req) => ({
        url: `/users/delete-dealerReq/${req.params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DealerRequest"],
    }),
    getAllNotifications: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/notifications/notification-adminend`,
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
  useGetSpacificUserQuery,
  useEditProfileAsAdminMutation,
  useBlockAndUnblockUserMutation,
  useMakeDealerMutation,
  useAllDealerRequestQuery,
  useAcceptDealerRequestMutation,
  useDeclineDealerRequestMutation,
  useGetAllNotificationsQuery,
  useDeleteDriverRequestMutation,
} = userApi;
