"use client";

import React, { useState } from "react";
import { auth } from "../../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const googleAuth = new GoogleAuthProvider();
  const { user, login, googleLogin } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await login(data.email, data.password);
      router.push("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await googleLogin();
      router.push("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, googleAuth);
  };

  return (
    <div className="grid grid-cols-1 gap-2 p-16 rounded-lg shadow-lg bg-[#363636] ">
      <div className="flex items-center justify-center pb-5">
        <Image
          src="/assets/images/tappedLogoReverse.png"
          alt="Tapped_Logo"
          width={330}
          height={90}
        />
      </div>

      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold text-xs md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              id="inline-email"
              type="text"
              placeholder=""
              onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
              value={data.email || ""}
            ></input>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold text-xs md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
              id="inline-password"
              type="password"
              placeholder=""
              onChange={(e: any) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              value={data.password || ""}
            ></input>
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <Link href="/sign-up">
              <button className="tapped_signup_btn">Sign Up</button>
            </Link>
          </div>
          <div className="md:w-2/3">
            <button className="tapped_btn w-full" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>

      <button onClick={handleGoogleLogin} type="button" className="google_btn">
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        Sign in with Google
      </button>
      <button type="button" className="apple_btn">
        <svg
          className="w-5 h-5 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="apple"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
          ></path>
        </svg>
        Sign in with Apple
      </button>
    </div>
  );
};

export default Login;
