import { baseApi } from "./baseApi";

const multipleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
    getAccountStats: build.query({
      query: () => ({
        url: "/stats/customer-stats",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
    getCustomerAdditionalStats: build.query({
      query: () => ({
        url: "/stats/customer-additional-stats",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
  }),
});

export const {
  useGetStripeTransactionQuery,
  useGetMyTransactionsQuery,
  useGetAccountTypesQuery,
  useGetAccountStatsQuery,
  useGetCustomerAdditionalStatsQuery,
} = multipleApi;
