import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dog Breeds | Find the Best Breed for Your Family",
  description:
    "Explore popular dog breeds and discover the best match for your family. Photos, size, temperament, and puppies available at GoldiPuppy.",
  alternates: { canonical: "/breeds" },
  keywords: ["dog breeds", "family dogs", "find a breed", "GoldiPuppy"],
};

export default function BreedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


