import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puppies for Sale | Healthy, Ethically Bred Puppies",
  description:
    "Browse healthy, happy puppies for sale from trusted, ethical breeders. Safe process, expert support, worldwide delivery.",
  alternates: { canonical: "/puppies" },
  keywords: ["puppies for sale", "buy a puppy", "ethical breeders", "GoldiPuppy"],
};

export default function PuppiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


