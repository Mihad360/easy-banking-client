import { baseApi } from "./baseApi";

const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAccount: build.mutation({
      query: (data) => ({
        url: "/account/create-account",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["branch"],
    }),
    getMyAccount: build.query({
      query: () => ({
        url: "/account/my-account",
        method: "GET",
      }),
      providesTags: ["account"],
    }),
  }),
});

export const { useCreateAccountMutation, useGetMyAccountQuery } = accountApi;
