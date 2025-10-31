import { AuthProvider } from "@/context/AuthProvider";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ATOPBANK",
  authors: "Wilson Ohioleayo",
  publisher: "Atop Web Technologies Team",
  description:
    "A Next.js application for to critically explain the basic features of next.js. every beginner should know about next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
