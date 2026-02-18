"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Account created! Please login.");
      router.push("/login");
    } else {
      alert("User already exists");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-xl">
        <h1 className="text-2xl font-bold">Signup</h1>

        <input placeholder="Name"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input placeholder="Email"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input type="password" placeholder="Password"
          className="border p-2 w-full"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Account
        </button>
      </form>
    </div>
  );
}
