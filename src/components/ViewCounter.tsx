import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { formatItemCount } from "@/utils";
import { writeClient } from "@/sanity/lib/write-client";

const ViewCounter = async ({ id }: { id: string }) => {
  await writeClient.patch(id).inc({ views: 1 }).commit();

  const result = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  const views = result?.views || 0;

  return <p className="view-text">{formatItemCount(views, "view")}</p>;
};

export default ViewCounter;
