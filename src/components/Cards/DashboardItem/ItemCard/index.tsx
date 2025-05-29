import { TProduct } from "@/types";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import ItemEditModal from "../ItemEditModal";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import DeleteConfirmationModal from "@/components/DeleteConformModal";
import { useDeleteProductMutation } from "@/redux/features/Item/itemApi";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi";

type ProductListProps = {
  products: TProduct[];
  isLoading?: boolean;
  isError?: boolean;
};

const ProductItem = ({
  products,
  isLoading,
  isError,
}: ProductListProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [item, setItem] = useState<TProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const filteredItems = products?.filter(
    (product) => product?.userId?._id === user?.id
  );

  const modifiedItems = user?.role === "admin" ? products : filteredItems;

  const [deleteItem] = useDeleteProductMutation();

  const handleDeleteConfirm = async () => {
    const toastId = toast.loading("Deleting product...");
    const res = await deleteItem({ productId: itemToDelete });
    if (!res?.data?.success) {
      toast.error("Failed to delete Item", { id: toastId });
    } else {
      toast.success("Item deleted successfully", { id: toastId });
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  // Loading State Component
  const LoadingState = () => (
    <div className="flex justify-center items-center py-10">
      <FiLoader className="w-6 h-6 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-600">Loading products...</span>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="text-center py-10 text-red-600">
      Failed to load products. Please try again later.
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-10">
      <FaBoxOpen className="w-16 h-16 text-gray-400 mb-4" />
      <p className="text-gray-500 text-lg">No products available</p>
    </div>
  );

  // Mobile Card View
  const MobileCard = ({ product }: { product: TProduct }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              product.status === "sold"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {product.status === "sold" ? "Sold Out" : "Available"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Price:</span>
            <span className="font-medium">${product.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Condition:</span>
            <span className="font-medium">{product.condition}</span>
          </div>
        </div>

        {product.location && (
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setItem(product);
            }}
            className={`flex-1 p-2 bg-blue-100 text-blue-800 cursor-pointer  rounded-lg hover:bg-blue-200 transition-colors ${
              user?.role === "admin" && "hidden"
            }`}
          >
            <FaEdit className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => {
              setIsDeleteModalOpen(true);
              setItemToDelete(product._id);
            }}
            className="flex-1 p-2 bg-red-100 text-red-800 cursor-pointer rounded-lg hover:bg-red-200 transition-colors"
          >
            <FaTrash className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {isLoading && <LoadingState />}
        {isError && <ErrorState />}
        {!isLoading && !isError && modifiedItems?.length === 0 && <EmptyState />}
        {!isLoading &&
          !isError &&
          modifiedItems?.map((product: TProduct) => (
            <MobileCard key={product._id} product={product} />
          ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="w-full border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading && (
                  <tr>
                    <td colSpan={7}>
                      <LoadingState />
                    </td>
                  </tr>
                )}

                {isError && (
                  <tr>
                    <td colSpan={7}>
                      <ErrorState />
                    </td>
                  </tr>
                )}

                {!isLoading && !isError && modifiedItems?.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState />
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  !isError &&
                  modifiedItems?.map((product: TProduct) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.image || "https://via.placeholder.com/300"}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-1 rounded-full">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-1 rounded-full">
                          {product.condition}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.location && (
                          <div className="flex items-center text-sm text-gray-500">
                            <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                            <span className="truncate max-w-[150px]">{product.location}</span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            product.status === "sold"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.status === "sold" ? "Sold Out" : "Available"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setItem(product);
                            }}
                            className={`p-2 bg-blue-100 text-blue-800 cursor-pointer rounded-lg hover:bg-blue-200 transition-colors ${
                              user?.role === "admin" && "hidden"
                            }`}
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setIsDeleteModalOpen(true);
                              setItemToDelete(product._id);
                            }}
                            className="p-2 bg-red-100 text-red-800 cursor-pointer rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <ItemEditModal
          item={item as TProduct}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          itemName={item?.name}
        />
      )}
    </div>
  );
};

export default ProductItem;