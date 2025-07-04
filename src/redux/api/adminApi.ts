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
      invalidatesTags: ["branch"],
    }),
    getUsers: build.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAdminStats: build.query({
      query: () => ({
        url: "/stats/admin-stats",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getAdminLastMonthStats: build.query({
      query: () => ({
        url: "/stats/last-month-stats",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    updateUserRole: build.mutation({
      query: (data) => ({
        url: `/users/update-role/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data?.userRole,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        contentType: "application/json",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetAdminStatsQuery,
  useGetAdminLastMonthStatsQuery,
} = adminApi;
