export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Story Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from a passion for sustainability and smart consumption,
            UseDify bridges the gap between pre-loved items and their new homes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-cyan-500 opacity-90" />
            <img
              src="https://thumbs.dreamstime.com/b/our-mission-message-written-pink-card-office-background-conceptual-symbol-337525079.jpg"
              alt="Community sharing items"
              className="w-full h-full object-cover mix-blend-multiply"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600">
                Create a circular economy where every used item finds new
                purpose, reducing waste and promoting sustainable living.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {["Sustainability", "Community", "Trust", "Innovation"].map(
                  (value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-700">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why People Choose Us?
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
        </div>
      </section>
    </div>
  );
}
