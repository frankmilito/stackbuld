"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/globalStore/store";
import { useRouter } from "next/navigation";
import { logout } from "@/globalStore/slices/postSlice";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.post);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };
  return (
    <nav className="flex justify-between items-center my-5">
      <h1 className="font-semibold text-2xl">Blog</h1>
      <ul className="flex gap-5">
        <Link href="/posts" className="cursor-pointer">
          Home
        </Link>
        <Link href={"#"} className="cursor-pointer">
          About{" "}
        </Link>
        <Link href={"#"} className="cursor-pointer">
          Contact
        </Link>
      </ul>
      <div className="flex gap-x-4">
        {userData?.username ? <p>{userData.username}</p> : ""}
        {userData?.username ? (
          <button className="font-bold " onClick={handleLogout}>
            Logout
          </button>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
