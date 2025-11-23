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
  }),
});

export const { useCreateStaticContentMutation } = settingsApi;
