import StartupCard, { StartupCardType } from "../../components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "../../sanity/lib/queries";
import { sanityFetch, SanityLive } from "../../sanity/lib/live";
import { auth } from "../auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const session = await auth();

  // console.log("Session data:", {
  //   id: session?.id,
  //   user: session?.user,
  //   expires: session?.expires,
  //   isAuthenticated: !!session?.user,
  // });

  return (
    <>
      <section className="pink_container">
        <div className="tag text-black">Pitch, vote, and grow</div>
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold dark:text-white">
          {query ? `Search results for "${query}"` : "Recommended startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartupCard key={post._id} post={post as StartupCardType} />
            ))
          ) : (
            <p className="no-result">No startup found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
