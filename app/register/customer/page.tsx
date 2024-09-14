"use client";
import PopoverContent from "@/app/components/PopoverContent";
import { FormEventHandler, useState } from "react";

export default function Page() {
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const handleUserRegistration: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        showError("Password & Confirm password does not match");
        return;
      }

      const response = await fetch("/api/register/customer", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.status >= 400) {
        const error = await response.json();
        showError(error.message);
      } else {
        setIsRegistered(true);
        setTimeout(() => {
          window.location.href = "../login";
        }, 2000);
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
            Create an customer account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleUserRegistration}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="John"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="doe"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
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
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="flex items-start">
              <div className="text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  Please provide your details (First name, Last name, email, and
                  password) to register as an customer
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-rose-500 hover:bg-rose-600 focus:ring-4 focus:outline-none focus:ring-rose-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-rose-600 hover:underline dark:text-rose-500"
              >
                Login here
              </a>
            </p>
          </form>

          <div className={isRegistered ? "block" : "hidden"}>
            <div className="flex flex-col w-full bg-emerald-100 p-4 rounded-lg text-emerald-700 border border-emerald-200 transition-opacity">
              <text className="font-semibold">
                Thank you for registering to Techerudite.
              </text>
              <text className="text-sm">
                You will be redirected in a few seconds, please{" "}
                <a className="underline underline-offset-2" href="/login">
                  click here
                </a>{" "}
                to Login.
              </text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
