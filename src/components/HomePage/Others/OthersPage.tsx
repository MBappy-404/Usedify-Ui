"use client";
import { useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

const OthersPage = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frequent Buyer",
      feedback:
        "I love shopping on UseDify! The quality of the products is amazing, and the prices are unbeatable. Highly recommended!",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 2,
      name: "Michael Smith",
      role: "First-Time Seller",
      feedback:
        "Selling on UseDify was so easy! I listed my old furniture, and it sold within a day. Great platform for both buyers and sellers.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Eco-Conscious Shopper",
      feedback:
        "UseDify is my go-to platform for sustainable shopping. I love giving used items a new life while saving money!",
      image: "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];
  return (
    <div className="bg-gray-50">
      {/* Featured Products Section */}
      <section className=" bg-white">
        {isLoading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Featured Products
            </h2>
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        )}

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.data?.slice(0,3)?.map((item: TProduct) => (
                <div
                  key={item?._id}
                  className="bg-white h-[450px] rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-full h-56 object-cover rounded-t-xl transition-transform duration-300"
                    />
                  </div>
                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Product Name */}
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">
                      {item?.name}
                    </h3>

                    {/* Price and Condition */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-blue-600 font-bold text-lg">
                        ${item?.price}
                      </span>
                      <span className="text-sm bg-green-100 text-green-800 px-2.5 py-1 rounded-full font-medium">
                        {item?.condition}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {item?.description?.slice(0, 120)}...
                    </p>

                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FaLocationDot className="w-5 h-5 mr-1.5 text-gray-400" />
                      <span>{item?.location}</span>
                    </div>

                    {/* View Details Button */}
                    {/* <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full cursor-pointer bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                          >
                            View Details
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </button> */}
                  </div>
                </div>
              ))}
            </div>
           <div className="flex  justify-center pt-14"> 
           <Link href={"/products"}>
            <button className="px-8 py-2 text-lg  rounded-full cursor-pointer bg-blue-600 text-white">View All</button>
            </Link>
           </div>
          </div>
        </section>
      </section>

      {/* Why Choose Us? Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast & Secure",
                description:
                  "Enjoy fast and secure transactions with our trusted platform.",
              },
              {
                icon: "🌍",
                title: "Eco-Friendly",
                description:
                  "Give used items a new life and contribute to a greener planet.",
              },
              {
                icon: "💼",
                title: "Easy Selling",
                description:
                  "Sell your items quickly and easily with our user-friendly tools.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-4 inline-block">
                  {feature.icon}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "📱" },
              { name: "Furniture", icon: "🪑" },
              { name: "Books", icon: "📚" },
              { name: "Fashion", icon: "👗" },
            ].map((category, index) => (
              <Link key={index} href={"/products"}>
                <div className="bg-gray-100 cursor-pointer p-6 rounded-lg text-center hover:bg-indigo-50 transition-colors">
                  <span className="text-4xl mb-4 inline-block">
                    {category.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600 italic">
                "{testimonial.feedback}"
              </p>
              <div className="mt-4 flex items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover border border-gray-200" 
                />
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Join thousands of users who are giving used items a new life.
          </p>
          <div className="space-x-4">
            <Link
              href="/products"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/dashboard/manage-items"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default OthersPage;
