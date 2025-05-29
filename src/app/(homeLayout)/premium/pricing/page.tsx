"use client";
import { FiCheck } from "react-icons/fi";

const PricingPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Basic listing features",
        "Standard support",
        "Basic analytics",
        "Up to 10 active listings"
      ]
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "/month",
      description: "Best for active sellers",
      features: [
        "Priority listing",
        "Advanced analytics",
        "Featured items",
        "24/7 support",
        "Custom storefront",
        "Bulk listing",
        "Promotional tools",
        "Market insights",
        "Unlimited listings"
      ],
      popular: true
    },
    {
      name: "Business",
      price: "$19.99",
      period: "/month",
      description: "For professional sellers",
      features: [
        "All Premium features",
        "Priority support",
        "API access",
        "Custom domain",
        "Team accounts",
        "Advanced reporting",
        "Dedicated account manager",
        "White-label options",
        "Unlimited everything"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan for your selling needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl p-8 shadow-lg border ${
                plan.popular
                  ? "border-blue-500 transform scale-105"
                  : "border-gray-100"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600">{plan.period}</span>
                  )}
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600">
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                  plan.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : plan.name === "Basic"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens after the trial?
              </h3>
              <p className="text-gray-600">
                After your 14-day trial, you'll be automatically charged for the plan you selected. You can cancel anytime before the trial ends.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied with your premium features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 