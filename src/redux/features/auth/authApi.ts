import { baseApi } from "@/redux/api/baseApi";

 

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/create-user",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


export const {useSigninMutation, useCreateUserMutation}= authApi;