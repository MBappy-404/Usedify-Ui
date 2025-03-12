import { QueryTypes } from "@/types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["item"],
    }),

    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: QueryTypes) => {
            params.append(item?.name, item?.value as string);
          });
        }

        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["item"],
      // transformResponse: (response: TResponseRedux<TSemester[]>) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
    deleteProduct: builder.mutation({
      query: (params) => ({
        url: `/products/${params?.productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["item"],
    }),
    getProduct: builder.query({
      query: (params) => ({
        url: `/products/${params?.productId}`,
        method: "GET",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["item"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} = productApi;
