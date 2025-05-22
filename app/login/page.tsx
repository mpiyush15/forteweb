"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      setStatus("✅ You are already logged in. Redirecting...");
      setTimeout(() => router.push("/dashboard/home"), 3000);
    }
  }, [sessionStatus, router]);

  if (sessionStatus === "authenticated") {
    return (
      <div className="text-center text-green-600 mt-10">
        ✅ You are already logged in.<br /> Redirecting to dashboard...
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Logging in...");

    const res = await signIn("credentials", {
      username: form.username,
      password: form.password,
      redirect: false,
    });

    if (res?.ok) {
      setStatus("✅ Logged in!");
      router.push("/dashboard/home");
    } else {
      setStatus("❌ Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4">{status}</p>
    </div>
  );
}