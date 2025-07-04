import { baseApi } from "./baseApi";

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyBranch: build.query({
      query: () => ({
        url: "/branch/my-branch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    getBranches: build.query({
      query: () => ({
        url: "/branch/",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
  }),
});

export const { useGetMyBranchQuery, useGetBranchesQuery } = branchApi;
