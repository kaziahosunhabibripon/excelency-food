import { Jost } from "next/font/google";
import "../styles/globals.css";
import GotoWhatspp from "@/components/common/GotoWhatspp";
import GoToTop from "@/components/common/GoToTop";
import { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/common/Footer";
import GlobalProvider from "@/components/core/GlobalProvider";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import ToastProvider from "./toastify";
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata = {
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/assets/logo-2.png",
        href: "/assets/logo-2.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/assets/logo-1.png",
        href: "/assets/logo-1.png",
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const message = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={`${jost.variable} antialiased`} suppressHydrationWarning>
        <NextTopLoader
          color="var(--brand-color)"
          crawlSpeed={5}
          showSpinner={false}
          speed={5}
        />
        <Suspense fallback={null}>
          <NextIntlClientProvider messages={message}>
            <GlobalProvider>{children}</GlobalProvider>

            <GotoWhatspp />
            <GoToTop />
            <Footer />
          </NextIntlClientProvider>
        </Suspense>
        <ToastProvider />
      </body>
    </html>
  );
}
