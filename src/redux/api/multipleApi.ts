import { baseApi } from "./baseApi";

const multipleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBranches: build.query({
      query: () => ({
        url: "/branch/",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
  }),
});

export const { useGetBranchesQuery } = multipleApi;
