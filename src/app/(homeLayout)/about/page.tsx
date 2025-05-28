"use client";
import { motion } from "framer-motion";
import { FaLeaf, FaShieldAlt, FaRocket, FaHandshake, FaUsers, FaChartLine, FaStar, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";

// Skeleton Loading Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative">
          {isLoading ? (
            <div className="text-center space-y-6">
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                  About Us
                </span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Born from a passion for sustainability and smart consumption,
                UseDify bridges the gap between pre-loved items and their new homes.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-32 bg-gray-200 rounded-2xl"></div>
                </div>
              ))
            ) : (
              [
                { number: "50K+", label: "Active Users", icon: <FaUsers className="w-6 h-6 text-blue-500" /> },
                { number: "100K+", label: "Items Listed", icon: <FaChartLine className="w-6 h-6 text-green-500" /> },
                { number: "95%", label: "Satisfaction", icon: <FaStar className="w-6 h-6 text-yellow-500" /> },
                { number: "24/7", label: "Support", icon: <FaShieldAlt className="w-6 h-6 text-indigo-500" /> }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="inline-block p-4 rounded-xl bg-white shadow-sm mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {isLoading ? (
              <>
                <div className="animate-pulse">
                  <div className="h-[500px] bg-gray-200 rounded-3xl"></div>
                </div>
                <div className="space-y-8">
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-2xl"></div>
                  </div>
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-2xl"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 group-hover:opacity-80 transition-opacity duration-300" />
                  <Image
                    src="https://thumbs.dreamstime.com/b/our-mission-message-written-pink-card-office-background-conceptual-symbol-337525079.jpg"
                    alt="Community sharing items"
                    fill
                    className="object-cover mix-blend-multiply transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <FaCheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Trusted Platform</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Join Our Growing Community</h3>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <FaLeaf className="text-green-500" />
                      Our Mission
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Create a circular economy where every used item finds new
                      purpose, reducing waste and promoting sustainable living.
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                            <Image
                              src={`https://i.pravatar.cc/150?img=${i + 10}`}
                              alt={`Team member ${i}`}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">Join 50K+ members</p>
                    </div>
                  </div>

                  <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <FaShieldAlt className="text-blue-500" />
                      Core Values
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { name: "Sustainability", icon: <FaLeaf className="text-green-500" />, color: "bg-green-50" },
                        { name: "Community", icon: <FaUsers className="text-blue-500" />, color: "bg-blue-50" },
                        { name: "Trust", icon: <FaHandshake className="text-indigo-500" />, color: "bg-indigo-50" },
                        { name: "Innovation", icon: <FaChartLine className="text-purple-500" />, color: "bg-purple-50" }
                      ].map((value) => (
                        <div key={value.name} className={`flex items-center gap-3 p-4 ${value.color} rounded-xl hover:bg-opacity-80 transition-colors cursor-pointer`}>
                          {value.icon}
                          <span className="text-lg font-medium text-gray-700">{value.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
          {isLoading ? (
            <div className="text-center mb-16">
              <SkeletonLoader />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4 inline-block">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why People Choose Us?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the difference with our premium features and dedicated service
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-2xl"></div>
                </div>
              ))
            ) : (
              [
                {
                  icon: <FaRocket className="w-8 h-8 text-blue-500" />,
                  title: "Fast & Secure",
                  description: "Enjoy fast and secure transactions with our trusted platform.",
                  color: "from-blue-200 to-blue-300",
                  features: ["Instant Transactions", "Secure Payments", "24/7 Support"]
                },
                {
                  icon: <FaLeaf className="w-8 h-8 text-green-500" />,
                  title: "Eco-Friendly",
                  description: "Give used items a new life and contribute to a greener planet.",
                  color: "from-green-200 to-green-300",
                  features: ["Reduce Waste", "Sustainable Living", "Green Impact"]
                },
                {
                  icon: <FaHandshake className="w-8 h-8 text-indigo-500" />,
                  title: "Easy Selling",
                  description: "Sell your items quickly and easily with our user-friendly tools.",
                  color: "from-indigo-200 to-indigo-300",
                  features: ["Quick Listing", "Smart Pricing", "Easy Management"]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
                >
                  <div className={`inline-block p-6 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 transition-transform duration-300 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <FaCheckCircle className="w-5 h-5 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 text-center relative">
          {isLoading ? (
            <div className="space-y-6">
              <SkeletonLoader />
              <div className="h-12 bg-white/20 rounded-lg w-48 mx-auto"></div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-4 inline-block">
                Get Started
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join Our Community
              </h2>
              <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
                Be part of a sustainable future where every item finds its perfect match
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-5 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 text-lg cursor-pointer">
                  Get Started Today
                </button>
                <button className="px-10 py-5 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg cursor-pointer">
                  Learn More
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
