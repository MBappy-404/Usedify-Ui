"use client";
import { FiCheck, FiStar } from "react-icons/fi";

const PremiumPage = () => {
  const features = [
    "Priority Listing",
    "Advanced Analytics",
    "Featured Items",
    "24/7 Support",
    "Custom Storefront",
    "Bulk Listing",
    "Promotional Tools",
    "Market Insights"
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unlock powerful features to boost your selling experience and reach more customers
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
              <p className="text-gray-600">Perfect for getting started</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">Free</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300">
              Coming Soon
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-500 transform scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <p className="text-gray-600">Best for active sellers</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300">
              Coming Soon
            </button>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <p className="text-gray-600">For professional sellers</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$19.99</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-600">
                  <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                  {feature}
                </li>
              ))}
              <li className="flex items-center text-gray-600">
                <FiStar className="w-5 h-5 text-yellow-500 mr-3" />
                Priority Support
              </li>
            </ul>
            <button className="w-full py-3 px-6 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Premium Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature} className="bg-white p-6 rounded-xl shadow-sm">
                <FiStar className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature}</h3>
                <p className="text-gray-600 text-sm">
                  Enhance your selling experience with our premium features
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage; 