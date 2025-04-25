import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Container } from "@/components/layout/Container";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import Banner from "@/components/Banner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { APPNAME, AppDescription } from "@/constant/constValue";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: APPNAME,
  description: AppDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AntdRegistry>
          <AppHeader />
          <Banner />
          <Container className="w-full">{children}</Container>
          <AppFooter />
        </AntdRegistry>
      </body>
    </html>
  );
}
