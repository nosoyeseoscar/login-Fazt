import Link from "next/link";
//import { useSession } from "next-auth/react"; se usa en front
import { getServerSession } from "next-auth/next"; //si usamos backend
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);
  //console.log(session);

  return (
    <nav className="flex justify-between bg-zinc-700 text-slate-200 px-24 py-3 items-center">
      <h1 className="text-xl font-bold">NextAuth</h1>
      <ul className="flex gap-x-2 ">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
