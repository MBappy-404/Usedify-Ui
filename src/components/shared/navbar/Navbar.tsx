"use client";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiHeart,
} from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/dashboard/manage-items", label: "Sell Item" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between py-5">
          {/* Left section */}
          <div className="flex items-center text-xl">
            <Link href="/" className="text-white text-2xl font-bold">
              UseDify
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-10 space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white text-xl px-3 py-2 rounded-md transition-colors ${
                    pathname === item.href
                      ? "font-bold border-b-2 border-white"
                      : "hover:text-blue-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Link href="/dashboard/wishlist">
                  <button className="text-white cursor-pointer translate-y-1 hover:text-blue-200 relative">
                    <FiHeart className="w-6 h-6" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>
                </Link>
              </div>

              <div className="relative" ref={dropdownRef}>
                {user ? (
                  <>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="text-white cursor-pointer flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Account</span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                        <Link
                         href="/dashboard/manage-items"
                          className="block cursor-pointer rounded-md  px-4 py-3 text-gray-800 hover:bg-blue-50"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="block px-4 py-3 cursor-pointer text-gray-800 hover:bg-blue-50"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left cursor-pointer px-4 py-3 text-gray-800 hover:bg-red-200 rounded-b-md"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href="/login">
                    <button className="text-white cursor-pointer flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      <FiUser className="w-5 h-5" />
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Wishlist */}
            <div className="md:hidden relative">
              <Link href="/dashboard/wishlist">
                <button className="text-white hover:text-blue-200">
                  <FiHeart className="w-6 h-6 mt-2" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-0 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white hover:text-blue-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-purple-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-white text-xl ${
                  pathname === item.href ? "font-bold bg-blue-800 rounded-md" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/dashboard/manage-items"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-white text-xl hover:bg-blue-800 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-white text-xl hover:bg-blue-800 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-white text-xl hover:bg-blue-800 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-white text-xl hover:bg-blue-800 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;