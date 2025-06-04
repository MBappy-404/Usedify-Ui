"use client";
import { useGetAllProductsQuery } from "@/redux/features/Item/itemApi";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaStar, FaArrowRight } from "react-icons/fa6";
import { FaSearch, FaShoppingCart, FaUser, FaHeart, FaShieldAlt, FaLeaf, FaRecycle, FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const OthersPage = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery(undefined);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frequent Buyer",
      feedback:
        "I love shopping on UseDify! The quality of the products is amazing, and the prices are unbeatable. Highly recommended!",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      location: "New York, USA",
    },
    {
      id: 2,
      name: "Michael Smith",
      role: "First-Time Seller",
      feedback:
        "Selling on UseDify was so easy! I listed my old furniture, and it sold within a day. Great platform for both buyers and sellers.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      location: "London, UK",
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Eco-Conscious Shopper",
      feedback:
        "UseDify is my go-to platform for sustainable shopping. I love giving used items a new life while saving money!",
      image: "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
      location: "Sydney, Australia",
    },
  ];

  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Secure Transactions",
      description: "Enjoy peace of mind with our secure payment system and buyer protection.",
      color: "from-blue-500 to-indigo-500",
      stats: "99.9% Secure",
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Eco-Friendly",
      description: "Join our mission to reduce waste and promote sustainable consumption.",
      color: "from-green-500 to-emerald-500",
      stats: "10k+ Items Recycled",
    },
    {
      icon: <FaRecycle className="w-8 h-8" />,
      title: "Easy Selling",
      description: "List your items in minutes with our streamlined selling process.",
      color: "from-purple-500 to-pink-500",
      stats: "5min Setup",
    },
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "1.2k+", color: "from-blue-400 to-blue-600" },
    { name: "Furniture", icon: "🪑", count: "800+", color: "from-green-400 to-green-600" },
    { name: "Books", icon: "📚", count: "2.5k+", color: "from-purple-400 to-purple-600" },
    { name: "Fashion", icon: "👗", count: "3.1k+", color: "from-pink-400 to-pink-600" },
  ];

  const stats = [
    { number: "50k+", label: "Active Users", icon: <FaUsers className="w-6 h-6" /> },
    { number: "100k+", label: "Items Listed", icon: <FaChartLine className="w-6 h-6" /> },
    { number: "95%", label: "Satisfaction", icon: <FaHandshake className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-gray-50" ref={containerRef}>
      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-10 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <div className="inline-block p-5 rounded-full bg-blue-100 text-blue-600 mb-6">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-bold text-gray-900 mb-3">{stat.number}</h3>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              Discover our handpicked selection of quality items
            </motion.p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data?.data?.slice(0, 4)?.map((item: TProduct, index: number) => (
                  <motion.div
                    key={item?._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-green-800 rounded-full text-sm font-medium shadow-sm">
                          {item.condition}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center text-base text-gray-500 mt-2">
                            <FaLocationDot className="w-5 h-5 mr-2 text-gray-400" />
                            <span className="line-clamp-1">{item.location}</span>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <span className="text-2xl font-bold text-blue-600">
                            ${item.price}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-base mb-8 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link href="/products">
                  <button className="px-8 cursor-pointer py-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 text-lg rounded-lg mx-auto">
                    View All Products
                    <FaArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Browse Categories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Explore our wide range of categories to find exactly what you're looking for
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href="/products">
                  <div className="group relative overflow-hidden rounded-xl bg-gray-50 p-10 text-center hover:bg-gray-100 transition-all duration-300 cursor-pointer">
                    <span className="text-5xl mb-6 inline-block transform group-hover:scale-110 transition-transform">
                      {category.icon}
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-lg text-gray-500">{category.count} items</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Why Choose Us?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Experience the best in sustainable shopping with our unique features
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                <p className="text-base font-medium text-blue-600">{feature.stats}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              Customer Reviews
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See what our customers have to say about their shopping experience
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-10 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-600 italic mb-8">
                  "{testimonial.feedback}"
                </p>
                <div className="flex items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-xl font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-base text-gray-500">{testimonial.role}</p>
                    <p className="text-base text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to buy or sell pre-loved items on UseDify
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center"
            >
              <div className="bg-blue-100 text-blue-600 rounded-full p-6 mb-6">
                <FaSearch className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Browse & Discover</h3>
              <p className="text-lg text-gray-500 text-center">
                Explore thousands of quality used products across multiple categories.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center"
            >
              <div className="bg-green-100 text-green-600 rounded-full p-6 mb-6">
                <FaShoppingCart className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Buy or Sell</h3>
              <p className="text-lg text-gray-500 text-center">
                Purchase with confidence or list your own items in minutes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center"
            >
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-6 mb-6">
                <FaUser className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Enjoy & Repeat</h3>
              <p className="text-lg text-gray-500 text-center">
                Receive your item or your earnings, and keep the cycle going!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with reputable partners to ensure a safe and premium experience.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Animated partner logos */}
            {(() => {
              const logos = [
                {
                  src: "https://images.seeklogo.com/logo-png/28/1/apex-shoes-logo-png_seeklogo-289498.png",
                  alt: "Apex"
                },
                {
                  src: "https://www.playnetwork.com/wp-content/uploads/2018/12/Bata-Logo-200x200.png",
                  alt: "Bata"
                },
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Lotto-logo-Performance.png",
                  alt: "Lotto"
                },
                {
                  src: "https://brandlogos.net/wp-content/uploads/2022/10/walton_group-logo_brandlogos.net_hnngy.png",
                  alt: "walton"
                },
                {
                  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnQrloETz2rwO4TZm6uFmHPzXVi8GfdpQmAw&s",
                  alt: "Techno"
                }
              ];
              return logos.map((logo, idx) => (
                <motion.div
                  key={logo.alt}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-xl shadow p-6 flex items-center w-52 h-24 justify-center"
                >
                  <img src={logo.src} alt={logo.alt} className="h-20 object-contain" />
                </motion.div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Join thousands of users who are giving used items a new life while saving money and helping the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/products">
                <button className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-3 text-lg cursor-pointer">
                  Start Shopping
                  <FaArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/dashboard/manage-items">
                <button className="w-full sm:w-auto px-10 py-5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg cursor-pointer">
                  Start Selling
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OthersPage;
