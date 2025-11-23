import { baseApi } from "../baseApi";

const recipeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecipe: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/recipe`,
          params: params,
        };
      },
      providesTags: ["recipe"],
    }),

    getRecipeById: builder.query({
      query: (id) => ({
        url: `/recipe/${id}`,
      }),
      providesTags: ["recipe"],
    }),

    recipeRequest: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args?.forEach((item) => {
          params.append(item.name, item.value);
        });

        return {
          url: `/recipe/recipe_request`,
          params: params,
        };
      },
      providesTags: ["recipe"],
    }),

    createRecipe: builder.mutation({
      query: (payload) => {
        return {
          url: `/recipe/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["recipe"],
    }),

    verifyAndRecipeRequest: builder.mutation({
      query: ({ id, data }) => {
        console.log(data, "Redux");

        return {
          url: `/recipe/update/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["recipe"],
    }),
  }),
});

export const {
  useGetAllRecipeQuery,
  useCreateRecipeMutation,
  useGetRecipeByIdQuery,
  useRecipeRequestQuery,
  useVerifyAndRecipeRequestMutation,
} = recipeApi;
