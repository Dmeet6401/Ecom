"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
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

  const getUserDetail = async () => {
    try {
      const res = await axios.get("/api/users/myProfile");
      console.log("🚀 ~ file: page.tsx:27 ~ getUserDetail ~ res:", res)
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
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
    <div>
      {/* Navigation Bar */}
      <Navbar/>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-[80vh] max-w-[90rem] mx-auto p-4">
        <h2 className="text-lg bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors" >
          {data === "nothing" ? (
            "m"
          ) : (
            <Link href={`/profile/${data}`}>
              View Profile
            </Link> 
          )}
        </h2>
        <h1 className="text-2xl font-bold">Profile</h1>
        {/* Add your profile content here */}
        <button
          onClick={getUserDetail}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Get My Profile
        </button>
      </div>
    </div>
  );
}
