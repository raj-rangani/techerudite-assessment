"use client";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<User>();
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/api/user/me", {
        method: "post",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 401) {
        window.location.href = "login";
      } else if (response.status === 200) {
        const body = await response.json();
        setUser(body.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserLogout = async () => {
    try {
      const response = await fetch("/api/user/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" },
      });

      console.log(response.status);
      if (response.status === 204) {
        window.location.href = "login";
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [setUser]);

  return (
    <div className="h-screen flex">
      <div className="flex-[3] flex items-center">
        <img className="h-full object-cover" src="/images/background.png" />
        <img className="absolute h-14 top-12 left-12" src="/images/logo.png" />
      </div>
      <div className="flex-[2] flex items-center justify-center">
        <div className=" w-[80%] p-6 space-y-4 md:space-y-6 sm:p-8">
          <img className="h-10" src="/images/logo.png" />
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Welcome to Techerudite
          </h1>
          <h3 className="text-xl font-light text-gray-500">
            Hello!{" "}
            <span className="text-rose-500 font-semibold">
              {user?.firstName} {user?.lastName}
            </span>
            . We are here to provide Innovative IT Solutions for your Business
          </h3>
          <div className="text-gray-500">
            Here is the{" "}
            <span>
              <a
                href="https://rajrangani.vercel.app"
                target="_blank"
                className="font-medium text-rose-600 hover:underline dark:text-rose-500"
              >
                Portfolio website
              </a>
            </span>{" "}
            show casing my works.
          </div>
          <button
            className="px-3 py-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-white font-semibold"
            onClick={handleUserLogout}
          >
            <text>Logout</text>
          </button>
        </div>
      </div>
    </div>
  );
}
