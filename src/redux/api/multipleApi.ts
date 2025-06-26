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
    getStripeTransaction: build.query({
      query: (id) => ({
        url: `/transaction/stripe/success/${id}`,
        method: "GET",
      }),
      providesTags: ["stripe"],
    }),
  }),
});

export const { useGetBranchesQuery, useGetStripeTransactionQuery } =
  multipleApi;
