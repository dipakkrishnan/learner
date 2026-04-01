import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learner — Conversational Hindi",
  description:
    "Learn Hindi for real conversations with family. Visual flashcards, spaced repetition, and voice practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
