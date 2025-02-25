"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any; }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-900 p-4">
      <div className="max-w-[90rem] mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Ecom</div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleProfileDropdown}
            className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
          >
            Profile
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg text-center z-10">
              <div className="p-4">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  View Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



