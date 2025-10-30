import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a Puppy | Secure Your Perfect Match",
  description:
    "Reserve your chosen puppy securely. Quick contact, deposit info, and a 2-day payment window. Manage reservations in your dashboard.",
  alternates: { canonical: "/reserve" },
  keywords: ["reserve puppy", "puppy deposit", "secure reservation", "GoldiPuppy"],
};

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


