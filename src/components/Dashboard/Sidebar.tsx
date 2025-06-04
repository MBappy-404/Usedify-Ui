"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiList,
  FiDollarSign,
  FiUser,
  FiUsers,
  FiHeart,
  FiShoppingCart,
  FiBarChart,
} from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();
  const router = useRouter();

  if (!user) {
    router.push("/login");

    toast.warning("Please login first");
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dashboardSidebarItems = [
    {
      href: "/dashboard/profile",
      icon: <FiUser className="w-6 h-6" />,
      label: "Profile Management",
    },
    {
      href: "/dashboard/manage-items",
      icon: <FiList className="w-6 h-6" />,
      label: "Manage Items",
    },
    {
      href: "/dashboard/purches-history",
      icon: <FiShoppingCart className="w-6 h-6" />,
      label: "Purchase History",
    },
    {
      href: "/dashboard/sales-history",
      icon: <FiDollarSign className="w-6 h-6" />,
      label: "Sales History",
    },
    {
      href: "/dashboard/wishlist",
      icon: <FiHeart className="w-6 h-6" />,
      label: "Wishlist",
    },
  ];

  const adminSidebarItems = [
    {
      href: "/dashboard",
      icon: <FiBarChart className="w-6 h-6" />,
      label: "Dashboard Overview",
    },
    {
      href: "/dashboard/manage-items",
      icon: <FiList className="w-6 h-6" />,
      label: "Manage Items",
    },
    {
      href: "/dashboard/manage-users",
      icon: <FiUsers className="w-6 h-6" />,
      label: "Manage Users",
    },
  ];

  const sidebarItems = user?.role === "admin" ? adminSidebarItems : dashboardSidebarItems;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-50  border-r-[2px]  border-gray-200 h-screen fixed top-0 left-0 overflow-auto z-[150] 
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-[250px]"} ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Toggle Button for Mobile */}
        <div className="p-4 flex justify-end lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Logo or Brand */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/">
            <h1
              className={`text-2xl font-bold text-blue-600 ${
                isCollapsed ? "hidden" : "block"
              }`}
            >
              Dashboard
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="mt-0   ">
          <ul className="space-y-1">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex ${
                    pathname === item?.href
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-50 text-gray-700"
                  } text-base items-center p-4  hover:bg-blue-100 hover:text-blue-600 transition-all duration-200`}
                >
                  {item.icon}
                  <span className={`ml-3 ${isCollapsed ? "hidden" : "block"}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Button */}
        <div className="absolute bottom-4 left-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {isCollapsed ? (
              <FiChevronRight className="w-6 h-6" />
            ) : (
              <FiChevronLeft className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-100">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 justify-start pl-0 md:pl-6 min-h-screen transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-0 md:ml-[250px]"
        }`}
      >
        <header className="z-50   dark:border-gray-700  shadow-sm  bg-gray-100 dark:bg-gray-900 sticky top-0 pt-2">
          <div className="flex flex-wrap items-center w-full relative tracking-wide">
            <div className="flex items-center gap-y-6  z-50 w-full pb-2">
              <div className="flex items-center gap-4 w-full px-6 bg-gray-100 dark:bg-gray-900  min-h-[48px] sm:mr-20 rounded-md outline-none border-none">
                <h2 className=" hidden md:block text-sm md:text-base uppercase">
                  {pathname.split("/")[2]}
                </h2>
              </div>

              <div className="flex items-center justify-end gap-6 ml-auto">
                <div className="flex items-center space-x-6 mr-2">
                  <Link
                    href="/"
                    className="w-9 h-[38px] flex items-center justify-center rounded-lg relative dark:bg-blue-950 bg-indigo-200 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[18px] h-[18px] dark:fill-gray-300 fill-gray-800"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                        data-original="#000000"
                      />
                      <path
                        d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                        data-original="#000000"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
};

export default Sidebar;
