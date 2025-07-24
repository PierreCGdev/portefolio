import { Open_Sans, Quicksand } from "next/font/google";
import ThemeProvider from "../components/ThemeProvider";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "Portfolio de Pierre Castanet",
  description: "ce site vous présente mon parcours et mes projets",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${quicksand.variable} bg-neutral-50 text-neutral-800 antialiased dark:bg-neutral-800 dark:text-neutral-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
