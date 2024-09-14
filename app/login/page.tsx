"use client";
import { FormEventHandler, useState } from "react";
import PopoverContent from "../components/PopoverContent";

export default function Page() {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleUserLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status >= 400) {
        const error = await response.json();
        showError(error.message);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showError = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="h-screen flex">
      <div className="flex-[3] flex items-center">
        <img className="h-full object-cover" src="/images/background.png" />
        <img className="absolute h-14 top-12 left-12" src="/images/logo.png" />
      </div>
      <div className="flex-[2] flex items-center justify-center">
        <PopoverContent
          message={message}
          hide={message === "" ? true : false}
        />
        <div className=" w-[80%] p-6 space-y-4 md:space-y-6 sm:p-8">
          <img className="h-10" src="/images/logo.png" />
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Login to account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleUserLogin}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                required
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-start">
              <div className="text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  If you registered as a customer, you are not permitted to log
                  in from this page. You will receive an error message if you
                  attempt to do so.
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to account
            </button>
            <p className="text-sm font-light text-gray-500">
              Don&apos;t have an account? Create{" "}
              <a
                href="/register/admin"
                className="font-medium text-rose-600 hover:underline dark:text-rose-500"
              >
                Admin account
              </a>{" "}
              or{" "}
              <a
                href="/register/customer"
                className="font-medium text-rose-600 hover:underline dark:text-rose-500"
              >
                Customer account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
