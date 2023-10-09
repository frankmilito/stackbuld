"use client";
import React from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/globalStore/store";
import { useRouter } from "next/navigation";
import SvgLogo from "./SvgLogo";
import { logout } from "@/globalStore/slices/postSlice";
const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userData } = useAppSelector((state) => state.post);
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const navlinks = [
    {
      title: "Home",
      link: "/posts",
    },
    {
      title: "About",
      link: "/#",
    },
    {
      title: "Contact",
      link: "/#",
    },
  ];
  return (
    <nav className="flex justify-between items-center my-5">
      <Link href="/posts" className="font-semibold text-2xl cursor-pointer">
        {/* Blog */}
        <SvgLogo />
      </Link>
      <ul className="md:flex gap-5 hidden ">
        {navlinks.map((navLink) => (
          <Link href="/posts" className="cursor-pointer" key={navLink.title}>
            {navLink.title}
          </Link>
        ))}
      </ul>
      <div className="flex gap-x-4">
        {userData?.username ? (
          <p className="text-red-600 font-bold italic">{userData.username}</p>
        ) : (
          ""
        )}
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
