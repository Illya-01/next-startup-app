import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

const CardsSkeleton = () => (
  <>
    {Array(4)
      .fill(0)
      .map((_, ind: number) => (
        <li key={cn("skeleton", ind)}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
  </>
);

export default CardsSkeleton;
