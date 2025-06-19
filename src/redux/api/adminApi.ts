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
      invalidatesTags: ["admin"],
    }),
    getUsers: build.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
      providesTags: ["user"],
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
  }),
});

export const {
  useCreateBranchMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
} = adminApi;
