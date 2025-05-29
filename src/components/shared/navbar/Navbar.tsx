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
  FiChevronDown,
  FiHome,
  FiInfo,
  FiGrid,
  FiSmartphone,
  FiShoppingBag,
  FiBook,
  FiBox,
  FiLayers,
  FiActivity,
  FiTool,
  FiMusic,
  FiImage,
  FiPackage
} from "react-icons/fi";

const categories = [
  { name: "Electronics", icon: <FiSmartphone className="w-6 h-6" /> },
  { name: "Fashion", icon: <FiShoppingBag className="w-6 h-6" /> },
  { name: "Furniture", icon: <FiHome className="w-6 h-6" /> },
  { name: "Books & Stationery", icon: <FiBook className="w-6 h-6" /> },
  { name: "Toys & Games", icon: <FiBox className="w-6 h-6" /> },
  { name: "Home Decor", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Sports Equipment", icon: <FiActivity className="w-6 h-6" /> },
  { name: "Tools & Equipment", icon: <FiTool className="w-6 h-6" /> },
  { name: "Musical Instruments", icon: <FiMusic className="w-6 h-6" /> },
  { name: "Health & Fitness", icon: <FiHeart className="w-6 h-6" /> },
  { name: "Collectibles & Art", icon: <FiImage className="w-6 h-6" /> },
  { name: "Uncategorized", icon: <FiPackage className="w-6 h-6" /> }
];

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: "Home", icon: <FiHome className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <FiInfo className="w-5 h-5" /> },
    { href: "/products", label: "Products", icon: <FiShoppingBag className="w-5 h-5" /> },
    { href: "/dashboard/manage-items", label: "Sell Item", icon: <FiShoppingCart className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <FiUser className="w-5 h-5" /> }
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
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur-md fixed w-full z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left section */}
          <div className="flex items-center text-xl">
            <Link href="/" className="text-blue-600 text-2xl md:text-3xl font-bold">
              UseDify
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center ml-10 space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-600 text-lg px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
              
              {/* Categories Dropdown */}
              <div className="relative group" ref={megaMenuRef}>
                <button
                  className="text-gray-600 cursor-pointer text-lg px-4 py-2 rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
                >
                  <FiGrid className="w-5 h-5" />
                  Categories
                  <FiChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                {/* Mega Menu */}
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  {/* Arrow Indicator */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                  
                  {/* Mega Menu Title */}
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-900">Browse Categories</h3>
                    <p className="text-sm text-gray-500 mt-1">Find what you're looking for in our wide range of categories</p>
                  </div>

                  <div className="grid grid-cols-4 gap-6">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={`/products?category=${category.name.toLowerCase()}`}
                        className="group/item flex flex-col items-center text-center p-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
                      >
                        <span className="text-3xl mb-3 transform group-hover/item:scale-110 transition-transform duration-300">{category.icon}</span>
                        <span className="font-medium text-gray-700 group-hover/item:text-blue-600 transition-colors duration-300">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <Link href="/dashboard/wishlist">
                  <button className="text-gray-600 hover:text-blue-600 cursor-pointer translate-y-1 transition-colors duration-300 relative">
                    <FiHeart className="w-6 h-6" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-sm">
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
                      className="text-gray-600 hover:text-blue-600 cursor-pointer flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Account</span>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <Link
                          href="/dashboard/manage-items"
                          className="block cursor-pointer px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          className="block px-4 py-3 cursor-pointer text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left cursor-pointer px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-300"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link href="/login">
                    <button className="text-white cursor-pointer flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md">
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
                <button className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  <FiHeart className="w-6 h-6 mt-2" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-0 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow-sm">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors duration-300"
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 text-gray-600 text-lg rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  pathname === item.href 
                    ? "bg-blue-50 text-blue-600 font-medium" 
                    : "hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Mobile Categories */}
            <div className="px-4 py-3">
              <div className="text-gray-600 text-lg font-medium mb-3">Categories</div>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${category.name.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                  >
                    <span className="text-2xl mb-2">{category.icon}</span>
                    <span className="font-medium text-gray-700 text-sm">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {user ? (
              <>
                <Link
                  href="/dashboard/manage-items"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 text-lg rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-600 text-lg rounded-xl hover:bg-gray-50 hover:text-blue-600 transition-all duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-gray-600 text-lg rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300"
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