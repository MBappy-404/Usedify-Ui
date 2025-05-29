"use client";
import { FiCheck, FiTrendingUp, FiUsers, FiBarChart2, FiStar, FiClock, FiShoppingBag, FiDollarSign } from "react-icons/fi";

const PremiumBenefitsPage = () => {
  const benefits = [
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Priority Listing",
      description: "Your items appear at the top of search results, increasing visibility and sales potential."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Featured Items",
      description: "Get your items featured on the homepage and category pages for maximum exposure."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Access detailed insights about your listings, views, and buyer behavior."
    },
    {
      icon: <FiStar className="w-8 h-8" />,
      title: "Custom Storefront",
      description: "Create a personalized storefront to showcase your brand and products."
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Get priority access to our customer support team around the clock."
    },
    {
      icon: <FiShoppingBag className="w-8 h-8" />,
      title: "Bulk Listing",
      description: "Save time by listing multiple items at once with our bulk upload feature."
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Promotional Tools",
      description: "Access advanced marketing tools to promote your listings effectively."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Benefits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our premium features can help you sell more and grow your business
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-blue-500 transition-all duration-300">
              <div className="text-blue-500 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-white rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Upgrade?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers who have already upgraded to premium
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300">
              Coming Soon
            </button>
            <button className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumBenefitsPage; 