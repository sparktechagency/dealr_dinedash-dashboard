import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addEmployee: build.mutation({
      query: (req) => ({
        url: `/admin/add`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.employee],
    }),
    getEmployee: build.query({
      query: ({ page, limit }) => {
        return {
          url: `/users/all-employee`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.employee],
    }),
    updateAdmin: build.mutation({
      query: (req) => ({
        url: `/admin/edit/${req?.params}`,
        method: "PUT",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.employee],
    }),
    // deleteAdmin: build.mutation({
    //   query: (req) => ({
    //     url: `/admin/${req?.params}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.employee],
    // }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetEmployeeQuery,
  useUpdateAdminMutation,
} = employeeApi;

export default employeeApi;
