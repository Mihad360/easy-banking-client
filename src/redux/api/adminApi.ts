import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBranch: build.mutation({
      query: (data) => ({
        url: "/branch/create-branch",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useCreateBranchMutation } = adminApi;
