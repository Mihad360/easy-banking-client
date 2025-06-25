import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    depositBalance: build.mutation({
      query: (data) => ({
        url: "/transaction/create-deposit",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const { useDepositBalanceMutation } = transactionApi;
