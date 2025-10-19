import type { Metadata } from "next";
import "./globals.css";
import Header from "./(components)/header";
import AuthWrapper from "@/auth/AuthWrapper";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/spotlight/styles.css";
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { en } from "@/constants/en";
import { Allura, Inter, Jost, Poppins } from "next/font/google";
import { Footer } from "@/app/(components)/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: en.commonPageTitle,
  description: en.appDescription,
};

const theme = createTheme({
  colors: {
    primary: [
      "#fbebe3", //light-peach primary.0
      "#f4e3da",
      "#ecc3ae",
      "#e5a17f",
      "#e08457",
      "#dd723e",
      "#dc6930",
      "#c35824",
      "#ae4d1e",
      "#984116",
    ],
    primaryDark: [
      "#fff1ea",
      "#f4e2db",
      "#e2c4b9",
      "#d0a494",
      "#c08974",
      "#b77860",
      "#b26c51", //brown, primaryDark.6
      "#9e5e45",
      "#8e523b",
      "#7e452f",
    ],
    gray: [
      "#f6f6f6", //gray, gray.0
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#575757",
    ],
    black: [
      "#f5f5f5",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#000000",
    ],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${allura.variable} ${jost.variable} antialiased`}
      >
        <MantineProvider theme={theme}>
          <AuthWrapper>
            <Header />
          </AuthWrapper>
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
