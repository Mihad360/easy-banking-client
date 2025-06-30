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
  }),
});

export const { useGetMyLoanQuery, useRequestLoanMutation } = loanApi;
