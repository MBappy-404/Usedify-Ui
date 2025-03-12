"use client";
import {
  useGetOrderInvoiceQuery,
  useGetSingleOrderQuery,
} from "@/redux/features/transactions/transactionsApi";
import { TProduct } from "@/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Spinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
  </div>
);

type OrderType = {
  product: TProduct;
  quantity: number;
};

const Invoice = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id"); // Correctly access the query parameter
  const router = useRouter();

  if (!orderId) {
    router.push("/dashboard/purchase-history");
    return null;
  }

  const {
    data: invoiceData,
    isLoading: invoiceLoading,
    isError: invoiceError,
  } = useGetOrderInvoiceQuery(orderId);
  const invoice = invoiceData?.data?.[0];
  console.log(invoice);

  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = useGetSingleOrderQuery({
    id: invoice?.customer_order_id,
  });

  if (invoiceLoading || orderLoading) return <Spinner />;
  if (invoiceError || orderError)
    return (
      <div className="text-center text-xl font-semibold py-10 text-red-500">
        OPSS! Failed to load invoice data.
      </div>
    );
  if (invoice?.bank_status === "Failed" || invoice?.bank_status === "Cancel") {
    return (
      <div className="flex flex-col items-center justify-center  bg-gray-100 p-6 rounded-2xl shadow-md">
        <div className="bg-red-100 text-red-600 p-4 rounded-full">❌</div>
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          Transaction {invoice?.bank_status}
        </h2>
        <p className="text-gray-600 mt-2 text-center">
          Something went wrong. Please try again
        </p>
        <Link href={"/dashboard/purches-history"}>
          <button className="mt-4 px-6 py-2 cursor-pointer bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
            Try Again
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {invoice?.bank_status === "Success" && (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
              <p className="text-sm text-gray-500">Order ID: {orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Invoice No:{" "}
                <span className="font-semibold">INV-{invoice?.invoice_no}</span>
              </p>
              <p className="text-sm text-gray-500">
                Date:{" "}
                <span className="font-semibold">
                  {invoice?.date_time?.slice(0, 10)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Bill to:
              </h2>
              <p className="text-sm text-gray-600">{invoice?.name}</p>
              <p className="text-sm text-gray-600">{invoice?.address}</p>
              <p className="text-sm text-gray-600">{invoice?.email}</p>
              <p className="text-sm text-gray-600">{invoice?.phone_no}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Payment Details:
              </h2>
              <p className="text-sm text-gray-600">
                Method: <span className="font-semibold">{invoice?.method}</span>
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Items
                  </th>
                  <th className="p-3 text-center text-sm font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="p-3 text-right text-sm font-semibold text-gray-700">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData?.data?.products?.map((item: OrderType) => (
                  <tr
                    key={item?.product?._id}
                    className="border-b border-gray-200"
                  >
                    <td className="p-3 text-sm text-gray-900">
                      {item?.product?.name}
                    </td>
                    <td className="p-3 text-center text-sm text-gray-500">
                      {orderData?.data?.products?.length}
                    </td>
                    <td className="p-3 text-right text-sm text-gray-500">
                      ${item?.product?.price?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100">
                  <th
                    colSpan={2}
                    className="p-3 text-right text-sm font-semibold text-gray-700"
                  >
                    Total Items: {orderData?.data?.products?.length}
                  </th>
                  <td className="p-3 text-right text-sm font-semibold text-gray-700">
                    Amount:{" "}
                    <span className="ml-2">
                      ${orderData?.data?.totalPrice?.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            Thank you for your payment! Your transaction has been successfully
            completed. You can print your invoice.
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Print Invoice
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
