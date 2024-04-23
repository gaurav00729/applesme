import type { Metadata } from "next";
import { Poppins,Roboto } from "next/font/google";
import "../globals.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
});


const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
});
export const metadata: Metadata = {
  title: "Apple SME ",
  description: "connect residuary private limites",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <ToastContainer />
        <main>{children}</main>
      </body>
    </html>
  );
}
