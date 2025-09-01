import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Pesa-Dash - Empower Your Sales Force",
  description: "Transform your African business with cutting-edge technology that powers your sales team to operate efficiently, innovate, and succeed.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}