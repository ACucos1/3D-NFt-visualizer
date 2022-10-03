import { NftCard } from "@components";

export const LoadingSkeleton = () => {
  return [...Array(8)].map((_, idx) => <NftCard key={idx} loading />);
};
