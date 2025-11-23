import { baseApi } from "../baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/blog`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["blog"],
    }),

    createBlog: builder.mutation({
      query: (payload) => ({
        url: `/blog/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
