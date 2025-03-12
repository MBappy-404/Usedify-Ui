import { baseApi } from "@/redux/api/baseApi";

 

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createOrder: builder.mutation({
    //   query: (data) => ({
    //     url: "/orders/create-order",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // getAllUser: builder.query({
    //   query: () => ({
    //     url: "/users",
    //     method: "GET",
    //   }),
    // }),
    // getUser: builder.query({
    //   query: (params) => ({
    //     url: `/users/${params?.id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["user"],
    // }),
    deactivedUser: builder.mutation({
      query: (params) => ({
        url: `/admin/users/${params?.userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `/admin/orders/${data?.orderId}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const { useDeactivedUserMutation, useUpdateOrderStatusMutation } =
  adminApi;