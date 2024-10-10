"use client";
import { signOut } from "next-auth/react";

function DashboardPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div>
        <h1 className="text-slate-200 text-5xl">Dashboard</h1>
        <button
          className="bg-white text-slate-800 px-4 rounded-md mt-4"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
export default DashboardPage;
