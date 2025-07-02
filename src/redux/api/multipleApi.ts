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
    getMyTransactions: build.query({
      query: () => ({
        url: "/transaction/personal-transactions",
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
    getAccountTypes: build.query({
      query: () => ({
        url: "/type/",
        method: "GET",
      }),
      providesTags: ["types"],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetStripeTransactionQuery,
  useGetMyTransactionsQuery,
  useGetAccountTypesQuery,
} = multipleApi;
