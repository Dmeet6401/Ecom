"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track burger menu status\
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if the user is logged in on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/users/status"); // Assuming you have an endpoint to check login status

        console.log("🚀 ~ checkLoginStatus ~ response:", response);
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login status", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      setIsLoggedIn(false);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/myProfile");
      router.push(`/profile/${res.data.data._id}`);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
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
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-[90rem] mx-auto flex justify-between items-center">
        <div className="text-black text-xl font-bold">
          <a href="/">eCom</a>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/men" className="text-black hover:text-gray-700 transition-colors px-2">Men</a>
          <a href="/women" className="text-black hover:text-gray-700 transition-colors px-2">Women</a>
          <a href="/kids" className="text-black hover:text-gray-700 transition-colors px-2">Kids</a>
        </div>
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="hidden md:flex relative" ref={dropdownRef}>
          {isLoggedIn ? (
            // If logged in, show profile and logout
            <>
              <button
                onClick={() => router.push("/cart")}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => router.push("/like")}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9932 5.13581C9.9938 2.7984 6.65975 2.16964 4.15469 4.31001C1.64964 6.45038 1.29697 10.029 3.2642 12.5604C4.89982 14.6651 9.84977 19.1041 11.4721 20.5408C11.6536 20.7016 11.7444 20.7819 11.8502 20.8135C11.9426 20.8411 12.0437 20.8411 12.1361 20.8135C12.2419 20.7819 12.3327 20.7016 12.5142 20.5408C14.1365 19.1041 19.0865 14.6651 20.7221 12.5604C22.6893 10.029 22.3797 6.42787 19.8316 4.31001C17.2835 2.19216 13.9925 2.7984 11.9932 5.13581Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={handleProfileDropdown}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.00002 21.8174C4.6026 22 5.41649 22 6.8 22H17.2C18.5835 22 19.3974 22 20 21.8174M4.00002 21.8174C3.87082 21.7783 3.75133 21.7308 3.63803 21.673C3.07354 21.3854 2.6146 20.9265 2.32698 20.362C2 19.7202 2 18.8802 2 17.2V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H17.2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8V17.2C22 18.8802 22 19.7202 21.673 20.362C21.3854 20.9265 20.9265 21.3854 20.362 21.673C20.2487 21.7308 20.1292 21.7783 20 21.8174M4.00002 21.8174C4.00035 21.0081 4.00521 20.5799 4.07686 20.2196C4.39249 18.6329 5.63288 17.3925 7.21964 17.0769C7.60603 17 8.07069 17 9 17H15C15.9293 17 16.394 17 16.7804 17.0769C18.3671 17.3925 19.6075 18.6329 19.9231 20.2196C19.9948 20.5799 19.9996 21.0081 20 21.8174M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-[45px] w-40 bg-white border border-gray-200 rounded-md shadow-lg text-center z-10 ">
                  <div className="p-2">
                    <button
                        onClick={getUserDetail}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            // If not logged in, show login button
            <>
              <button
                onClick={() => router.push("/signup")}
                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Sign Up
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={handleMenuToggle} className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <a href="/men" className="block text-black hover:text-gray-700 transition-colors px-2 py-1 text-center">  Men</a>
          <a href="/women" className="block text-black hover:text-gray-700 transition-colors px-2 py-1 text-center">Women</a>
          <a href="/kids" className="block text-black hover:text-gray-700 transition-colors px-2 py-1 text-center"> Kids</a>
          <a href="/cart" className="block text-black hover:text-gray-700 transition-colors px-2 py-1 text-center"> Cart</a>
          <a href="/Liked" className="block text-black hover:text-gray-700 transition-colors px-2 py-1 text-center">Liked</a>
          {/* <a href={`/profile/${data}`} className="block text-black hover:text-gray-700 transition-colors px-2 py-1 text-center"> My Profile</a> */}
          {/* <a href="/Logout" className="block text-black hover:text-gray-700 transition-colors px-2 py-1">Logout</a> */}
          <button
              onClick={getUserDetail}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center font-bold"
            >
              My Profile
          </button>
          <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors text-center font-bold"
            >
              Logout
          </button>
          <div className="relative" ref={dropdownRef}>
            
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
