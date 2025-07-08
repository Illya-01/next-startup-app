import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../app/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Next Startup logo"
            width={144}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">Create</Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                Log out
              </button>
              <Link href={`user/${session?.id}`}>{session.user.name}</Link>
            </>
          ) : (
            <button
              onClick={async () => {
                "use server";
                await signIn("google");
              }}
            >
              Log in
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
