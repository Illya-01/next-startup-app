import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { formatDate } from "@/lib/custom-utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

export const experimental_ppr = true;

const StartupDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [post, playlist] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "best-of-the-month",
    }),
  ]);

  const selectedPosts = playlist?.select || [];

  if (!post) return notFound();

  const md = markdownit();
  const parsedPitch = md.render(post.pitch as string);

  return (
    <>
      <section className="pink_container">
        <div className="tag text-black">{formatDate(post._createdAt)}</div>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading max-w-5xl">{post.description} </p>
      </section>

      <section className="section_container">
        {post.image && (
          <Image
            src={post.image}
            alt="thumbnail of the startup"
            width={1200}
            height={600}
            className="w-full h-auto rounded-2xl"
          />
        )}

        <div className="mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5 mb-6">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center"
            >
              <Image
                src={post.author?.image || "https://placehold.co/100x100.png"}
                alt="author avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium">{post.author?.username}</p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <section>
            <h3 className="text-30-bold mb-7">Pitch details</h3>
            {parsedPitch ? (
              <article
                className="markdown"
                dangerouslySetInnerHTML={{ __html: parsedPitch }}
              ></article>
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </section>
        </div>

        <hr className="divider" />

        {selectedPosts?.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Best of the month</p>

            <ul className="mt-7 card_grid-sm">
              {selectedPosts.map((startup) => (
                <StartupCard
                  key={startup._id}
                  post={startup as unknown as StartupCardType}
                />
              ))}
            </ul>
          </section>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default StartupDetailsPage;
