"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // const [loading, setLoading] = useState(false);

  const log_in = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    try {
      await axios.post("/api/users/login", user);
      // const response = await axios.post("/api/users/login", user);
      console.log("Login successful");
      // setLoading(false);
      router.push("/");
    } catch (error: any) {
      // setLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-7 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-black">
            Sign in Here
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-black hover:text-gray-700"
            >
              Sign up
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                required
              />
              <div className="text-right mt-1">
                <Link
                  href="/forgot-password"
                  className="text-sm text-black hover:text-gray-700"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={log_in}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}