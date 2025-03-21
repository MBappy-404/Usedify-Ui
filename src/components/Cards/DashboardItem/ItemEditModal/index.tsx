"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/features/Item/itemApi";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  FiCamera,
  FiDollarSign,
  FiTag,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

interface ItemDetailsModalProps {
  item: TProduct;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function ItemEditModal({
  item,
  isModalOpen,
  setIsModalOpen,
}: ItemDetailsModalProps) {
  const [preview, setPreview] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();
  const [updateItem] = useUpdateProductMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  interface HandleImageUploadEvent
    extends React.ChangeEvent<HTMLInputElement> {}

  const handleImageUpload = (e: HandleImageUploadEvent): void => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview([previewUrl]); // Replace instead of adding
      setSelectedFile(file);
    }
  };

  const closeModal = () => setIsModalOpen(false);
  //   console.log(item);

  useEffect(() => {
    if (item) {
      reset({
        name: item?.name || "",
        price: Number(item?.price || ""),
        category: item?.category || "",
        description: item?.description || "",
        image: item?.image || "",
        condition: item?.condition || "",
        location: item.location || "",
      });
    }
  }, [item, reset]);

  const handleAddItem = async (data: FieldValues) => {
    const toastId = toast.loading("Creating product....");
    const product = {
      ...data,
      userId: item?.userId,
      price: Number(data.price),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(product));
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    // console.log(Object.fromEntries(formData));

    const res = await updateItem({ productId: item?._id, formData });
    // console.log(res);

    if (!res?.data?.success) {
      toast.error("Failed to update item! Contact admin", { id: toastId });
    } else {
      toast.success(res?.data?.message, { id: toastId });
      reset();
      setSelectedFile(null);
      router.refresh();
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white md:w-[55%] p-5 md:p-10 rounded-xl w-full  max-h-[95vh]  overflow-y-auto z-10  relative transform transition-all duration-300 ease-out   "
            style={{
              animation: "modalEnter 0.3s ease-out forwards",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <svg
                className="w-6 h-6 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}

            <form onSubmit={handleSubmit(handleAddItem)}>
              <div className="">
                <div className="">
                  <h2 className="text-3xl font-bold mb-8">Add Your Item</h2>

                  {/* Image Upload and Preview */}
                  <label htmlFor="image">
                    <div className="mb-8">
                      <label className="block text-gray-700 mb-2">
                        Upload Photos
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-500 transition-colors">
                        <input
                          type="file"
                          id="image"
                          {...register("image")}
                          onChange={handleImageUpload}
                          className="hidden"
                          accept="image/*"
                        />
                        <FiCamera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">
                          Drag photos here or click to upload
                        </p>
                      </div>
                    </div>
                  </label>
                  {/* Image Previews */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {preview.length > 0
                      ? preview.map((img: string, index) => (
                          <div key={index} className="relative">
                            <img
                              src={img}
                              alt={`Preview ${index}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              className="absolute top-1 right-1 bg-gray-200 cursor-pointer p-1 rounded-full"
                              onClick={() =>
                                setPreview(
                                  preview.filter((_, i) => i !== index)
                                )
                              }
                            >
                              <FiX className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        ))
                      : item?.image && (
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={`Preview ${item.name}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          </div>
                        )}
                  </div>

                  {/* Item Details */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Item Title
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "Item name is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Vintage Leather Jacket"
                      />
                      {errors.name && (
                        <p className="text-sm text-rose-500">
                          {errors.name?.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        {...register("description", {
                          required: "Item description is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Tell potential buyers about your item..."
                      />
                      {errors.description && (
                        <p className="text-sm text-rose-500">
                          {errors.description.message as string}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 ">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          Price
                        </label>
                        <div className="relative">
                          <FiDollarSign className="absolute left-3 top-4 text-gray-400" />
                          <input
                            type="number"
                            {...register("price", {
                              required: "Item price is required",
                            })}
                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                        {errors.price && (
                          <p className="text-sm text-rose-500">
                            {errors.price.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">
                          Category
                        </label>
                        <div className="relative">
                          <FiTag className="absolute left-3 top-4 text-gray-400" />
                          <select
                            {...register("category", {
                              required: "Category is required",
                            })}
                            className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          >
                            <option value="Uncategorized">
                              Select Category
                            </option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Fashion">Fashion</option>
                            <option value=" Books & Stationery">
                              Books & Stationery
                            </option>
                            <option value="Toys & Games">Toys & Games</option>
                            <option value="Home Decor">Home Decor</option>
                            <option value="Sports Equipment">
                              Sports Equipment
                            </option>
                            <option value="Tools & Equipment">
                              Tools & Equipment
                            </option>
                            <option value="Musical Instruments">
                              Musical Instruments
                            </option>
                            <option value="Health & Fitness">
                              Health & Fitness
                            </option>
                            <option value="Collectibles & Art">
                              Collectibles & Art
                            </option>
                            <option value="Uncategorized">Uncategorized</option>
                          </select>
                        </div>
                        {errors.category && (
                          <p className="text-sm text-rose-500">
                            {errors.category.message as string}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Condition
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Brand New",
                          "Like New",
                          "Good",
                          "Well Used",
                          "For Parts or Repair",
                        ].map((condition) => (
                          <label
                            key={condition}
                            className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500"
                          >
                            <input
                              type="radio"
                              {...register("condition", {
                                required: "Item condition is required",
                              })}
                              value={condition}
                              className="mr-3"
                            />
                            {condition}
                          </label>
                        ))}
                      </div>
                      {errors.condition && (
                        <p className="text-sm text-rose-500">
                          {errors.condition.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        {...register("location", {
                          required: "Location is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter item location"
                      />
                      {errors.location && (
                        <p className="text-sm text-rose-500">
                          {errors.location.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-8 cursor-pointer w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
                  >
                    Update Listing
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes modalEnter {
            0% {
              transform: scale(0.95);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
