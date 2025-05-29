"use client";
import { FiCheck, FiX } from "react-icons/fi";

const ComparePlansPage = () => {
  const features = [
    {
      name: "Listing Features",
      items: [
        {
          name: "Number of Active Listings",
          basic: "Up to 10",
          premium: "Unlimited",
          business: "Unlimited"
        },
        {
          name: "Featured Listings",
          basic: "No",
          premium: "Up to 5 per month",
          business: "Unlimited"
        },
        {
          name: "Priority Listing",
          basic: "No",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "Bulk Listing",
          basic: "No",
          premium: "Yes",
          business: "Yes"
        }
      ]
    },
    {
      name: "Analytics & Insights",
      items: [
        {
          name: "Basic Analytics",
          basic: "Yes",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "Advanced Analytics",
          basic: "No",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "Market Insights",
          basic: "No",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "Custom Reports",
          basic: "No",
          premium: "No",
          business: "Yes"
        }
      ]
    },
    {
      name: "Support & Features",
      items: [
        {
          name: "Email Support",
          basic: "Yes",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "24/7 Priority Support",
          basic: "No",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "Dedicated Account Manager",
          basic: "No",
          premium: "No",
          business: "Yes"
        },
        {
          name: "API Access",
          basic: "No",
          premium: "No",
          business: "Yes"
        }
      ]
    },
    {
      name: "Store Features",
      items: [
        {
          name: "Custom Storefront",
          basic: "No",
          premium: "Yes",
          business: "Yes"
        },
        {
          name: "Custom Domain",
          basic: "No",
          premium: "No",
          business: "Yes"
        },
        {
          name: "Team Accounts",
          basic: "No",
          premium: "No",
          business: "Yes"
        },
        {
          name: "White-label Options",
          basic: "No",
          premium: "No",
          business: "Yes"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Compare Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect plan for your needs by comparing features across all tiers.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">
                  Features
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">
                  Basic
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">
                  Premium
                </th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900">
                  Business
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((section) => (
                <>
                  <tr key={section.name} className="bg-gray-50">
                    <td
                      colSpan={4}
                      className="py-3 px-6 text-sm font-semibold text-gray-900"
                    >
                      {section.name}
                    </td>
                  </tr>
                  {section.items.map((item) => (
                    <tr key={item.name} className="border-b border-gray-200">
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.basic === "Yes" ? (
                          <FiCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : item.basic === "No" ? (
                          <FiX className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.basic}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.premium === "Yes" ? (
                          <FiCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : item.premium === "No" ? (
                          <FiX className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.premium}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {item.business === "Yes" ? (
                          <FiCheck className="w-5 h-5 text-green-500 mx-auto" />
                        ) : item.business === "No" ? (
                          <FiX className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          <span className="text-sm text-gray-600">
                            {item.business}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Upgrade?
          </h2>
          <p className="text-gray-600 mb-8">
            Choose the plan that best fits your needs and start selling smarter today.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              Coming Soon
            </button>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePlansPage; 