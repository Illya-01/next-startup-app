import StartupCard from "../../components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const posts = [
    {
      _id: 1,
      views: 232,
      author: {
        _id: 1,
        name: "Steven Smith",
      },
      description:
        "A mobile app that helps users track and reduce their carbo and best ins...",
      image:
        "https://assets.super.so/9b1db7dc-155d-4da6-bf88-a68ad1c2af0f/images/c264fdfb-08b5-4bf8-b834-2ba2683f3056/opengraph-image.png",
      category: "Robots",
      title: "We Robots",
      _createdAt: new Date(),
    },
  ];

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
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startup found</p>
          )}
        </ul>
      </section>
    </>
  );
}
