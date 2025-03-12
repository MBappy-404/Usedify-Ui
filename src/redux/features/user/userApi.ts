import { baseApi } from "@/redux/api/baseApi";

 

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (params) => ({
        url: `/users/${params?.id}`,
        method: "GET",
      }),
      providesTags:['user']
    }),
    updateUser: builder.mutation({
      query: (params) => ({
        url: `/users/${params?.id}`,
        method: "PUT",
        body: params
      }),
       invalidatesTags:['user']
    }),
  }),
});

export const { useGetAllUserQuery, useGetUserQuery, useUpdateUserMutation } = userApi;