import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "DeskGrid",
  description: "Open Source Desk Reservation Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
