// src/components/RegistrationForm.js
"use client";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/globalStore/store";
import { logUser, registration } from "@/globalStore/slices/postSlice";
import { useRouter } from "next/navigation";
const RegistrationForm = () => {
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const redirect = () => {
    router.push("/posts");
    router.refresh();
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      registration({
        ...formData,
        redirect,
      })
    );
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-md py-1 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md py-1 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-md py-1 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-md py-1 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white  rounded-md py-2 hover:bg-red-600 transition duration-300"
        >
          {loading ? "Please wait..." : "  Register"}
        </button>

        <p
          className="text-red-400 cursor-pointer mt-3 text-sm underline"
          onClick={() => dispatch(logUser())}
        >
          Already a user Login
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
