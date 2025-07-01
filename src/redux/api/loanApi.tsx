import { baseApi } from "./baseApi";

const loanApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyLoan: build.query({
      query: () => ({
        url: "/loan/my-loan",
        method: "GET",
      }),
      providesTags: ["loan"],
    }),
    requestLoan: build.mutation({
      query: (data) => ({
        url: "/loan/request-loan",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["loan"],
    }),
    payLaon: build.mutation({
      query: (data) => ({
        url: `/loan/pay-loan/${data?.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data?.loanData,
      }),
      invalidatesTags: ["loan"],
    }),
  }),
});

export const { useGetMyLoanQuery, useRequestLoanMutation, usePayLaonMutation } =
  loanApi;
