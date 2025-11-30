import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Redpen Annotations",
  description: "Inline note workflow prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
