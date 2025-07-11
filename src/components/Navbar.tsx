import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../app/auth";
import { CirclePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getFirstLetter as capitalizeFirstLetter } from "@/lib/custom-utils";

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
        <div className="flex items-center gap-5 text-black font-semibold">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <CirclePlus className="size-6 sm:hidden" />
              </Link>
              <button
                className="text-primary-400 cursor-pointer"
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span className="max-sm:hidden">Log out</span>
                <LogOut className="size-6 sm:hidden text-primary-400" />
              </button>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-9">
                  <AvatarImage
                    src={session?.user?.image as string}
                    alt="user avatar"
                  />
                  <AvatarFallback className="text-16-medium bg-primary text-white">
                    {capitalizeFirstLetter(session?.user?.name || "U")}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <button
              className="cursor-pointer"
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
