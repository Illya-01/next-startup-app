import { auth } from "@/app/auth";
import CardsSkeleton from "@/components/CardsSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserStartups from "@/components/UserStartups";
import { getFirstLetter } from "@/lib/custom-utils";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Avatar className="size-[200px] rounded-none">
            <AvatarImage
              src={session?.user?.image as string}
              alt="user profile picture"
            />
            <AvatarFallback className="text-6xl bg-primary-100 dark:bg-black text-foreground rounded-none">
              {getFirstLetter(session?.user?.name || "U")}
            </AvatarFallback>
          </Avatar>

          <p className="text-30-extrabold mt-7 text-center">{user.username}</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<CardsSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default UserPage;
