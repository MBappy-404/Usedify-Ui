import { TProduct } from "@/types";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import ItemEditModal from "../ItemEditModal";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import DeleteConfirmationModal from "@/components/DeleteConformModal";
import { useDeleteProductMutation } from "@/redux/features/Item/itemApi";
import { toast } from "sonner";
import { FiLoader } from "react-icons/fi"; // Import loading spinner icon

type ProductListProps = {
  products: TProduct[];
  isLoading?: boolean; // Add isLoading prop
  isError?: boolean; // Add isError prop
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

  return (
    <div>
      <div className="w-full border-[3px] border-gray-200 rounded-2xl overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-base font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Loading State */}
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  <div className="flex justify-center items-center">
                    <FiLoader className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading products...</span>
                  </div>
                </td>
              </tr>
            )}

            {/* Error State */}
            {isError && (
              <tr>
                <td colSpan={7} className="text-center py-10 text-red-600">
                  Failed to load products. Please try again later.
                </td>
              </tr>
            )}

            {/* Empty State */}
            {!isLoading && !isError && modifiedItems?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center">
                    <FaBoxOpen className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg">No products available</p>
                  </div>
                </td>
              </tr>
            )}

            {/* Data Rows */}
            {!isLoading &&
              !isError &&
              modifiedItems?.map((product: TProduct) => (
                <tr key={product._id} className="transition-colors">
                  {/* Product Name and Image */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-10 h-10 rounded-full border border-gray-100 object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name?.slice(0, 10)}...
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="bg-gray-200 text-gray-700 text-sm font-semibold px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${product.price.toLocaleString()}
                  </td>

                  {/* Condition */}
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                      {product.condition}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">
                    {product.location && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{product.location}</span>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-2 py-4">
                    {product.status !== "sold" && (
                      <button className="p-2 cursor-pointer bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2">
                        <span className="text-sm font-medium">Available</span>
                      </button>
                    )}
                    {product.status === "sold" && (
                      <button className="p-2 cursor-pointer bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
                        <span className="text-sm font-medium">Sold Out</span>
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center cursor-pointer gap-2">
                      {/* Update Button */}
                      <button
                        onClick={() => {
                          setIsModalOpen(true), setItem(product);
                        }}
                        className={`p-2 bg-blue-100 text-blue-800 cursor-pointer rounded-lg hover:bg-blue-200 transition-colors ${
                          user?.role === "admin" && "hidden"
                        }`}
                      >
                        <FaEdit />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setItemToDelete(product._id);
                        }}
                        className="p-2 bg-red-100 text-red-800 cursor-pointer rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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