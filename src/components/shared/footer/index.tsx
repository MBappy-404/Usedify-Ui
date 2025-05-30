"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold text-white">UseDify</span>
            </Link>
            <p className="text-sm md:text-base text-gray-400">
              UseDify is your go-to platform for buying and selling used items.
              Give used items a new life and contribute to a sustainable future.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.94 13.94 0 0 1 1.67 3.148a4.92 4.92 0 0 0 1.523 6.574 4.903 4.903 0 0 1-2.229-.616v.062a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 14.001-7.496 14.001-14 0-.213-.005-.426-.015-.637A10.025 10.025 0 0 0 24 4.557z" />
                </svg>
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/manage-items"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Sell Your Items
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/wishlist"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Premium Section */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Premium Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/premium"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Premium Membership
                </Link>
              </li>
              <li>
                <Link
                  href="/premium/benefits"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Premium Benefits
                </Link>
              </li>
              <li>
                <Link
                  href="/premium/pricing"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/premium/compare"
                  className="text-sm md:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Compare Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm md:text-base text-gray-400">
                <span className="font-medium">Email:</span>{" "}
                <Link
                  href="mailto:contact@usedify.com"
                  className="hover:text-white transition-colors"
                >
                  contact@usedify.com
                </Link>
              </li>
              <li className="text-sm md:text-base text-gray-400">
                <span className="font-medium">Phone:</span>{" "}
                <Link
                  href="tel:01323445568"
                  className="hover:text-white transition-colors"
                >
                  01323445568
                </Link>
              </li>
              <li className="text-sm md:text-base text-gray-400">
                <span className="font-medium">Address:</span> Rajshahi, Bangladesh
              </li>
              <li className="text-sm md:text-base text-gray-400">
                <span className="font-medium">Hours:</span> Mon-Fri, 9AM-6PM
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm md:text-base text-gray-400">
            &copy; {new Date().getFullYear()} UseDify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;