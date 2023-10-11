"use client";
import Login from "@/components/Login";
import RegistrationForm from "@/components/Registration";
import Image from "next/image";
import { useAppSelector } from "@/globalStore/store";

export default function Home() {
  const { isLogin } = useAppSelector((state) => state.post);
  return <main className="">{isLogin ? <Login /> : <RegistrationForm />}</main>;
}
