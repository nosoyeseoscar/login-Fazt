"use client";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/4">
        {error && (
          <span className="bg-red-500 text-lg text-slate-200 p-3 rounded block">
            {error}
          </span>
        )}

        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

        <label htmlFor="email" className="text-slate-400 mb-2 text-sm">
          Email:
        </label>

        <input
          id="email"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="email@mail.com"
        />

        {errors.email && (
          <span className="text-red-500 block">{errors.email.message}</span>
        )}

        <label htmlFor="password" className="text-slate-400 mb-2 text-sm">
          Password
        </label>

        <input
          id="password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "A password is required",
            },
          })}
          className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          placeholder="********"
        />

        {errors.password && (
          <span className="text-red-500 block">{errors.password.message}</span>
        )}

        <button className="bg-blue-500 p-3 w-full rounded-lg text-slate-100 mt-2">
          Login
        </button>
      </form>
    </div>
  );
}
