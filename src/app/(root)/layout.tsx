import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Providers } from "./providers";
import Main from "@/components/Main";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Apple SME Program",
  description: "Connect residuary private limited",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Providers>
          <Main>
            <main>{children}</main>
          </Main>
        </Providers>
      </body>
    </html>
  );
}
