import { baseApi } from "@/redux/api/baseApi";

 

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/transactions",
        method: "POST",
        body: data,
      }),
    }),
    getOrders: builder.query({
      query: (params) => ({
        url: `/orders/${params?.id}`,
        method: "GET",
      }),
    }),
    purchaseHistory: builder.query({
      query: (params) => ({
        url: `/transactions/purchases/${params?.userId}`,
        method: "GET",
      }),
    }),
    salesHistory: builder.query({
      query: (params) => ({
        url: `/transactions/sales/${params?.userId}`,
        method: "GET",
      }),
    }),
    getSingleOrder: builder.query({
      query: (params) => ({
        url: `/transactions/${params?.id}`,
        method: "GET",
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `/transactions/orders/`,
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    getOrderInvoice: builder.query({
      query: (order_id) => ({
        url: "/transactions/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    deleteOrders: builder.mutation({
      query: (params) => ({
        url: `/orders/${params?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transactions"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  usePurchaseHistoryQuery,
  useSalesHistoryQuery,
  useGetSingleOrderQuery,
  useGetAllOrdersQuery,
  useGetOrderInvoiceQuery,
  useDeleteOrdersMutation,
} = orderApi;