import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

const description =
  "Boots and Barns Animal Farm is a family-run farm in Ikot-Ekpene, Nigeria, raising pigs, growing crops, and supporting the community around it.";

export const metadata: Metadata = {
  metadataBase: new URL("https://bootsandbarns.com"),
  title: "Boots and Barns Animal Farm",
  description,
  openGraph: {
    title: "Boots and Barns Animal Farm",
    description,
    url: "https://bootsandbarns.com",
    siteName: "Boots and Barns Animal Farm",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/img/animals/IMG_20260917_081413.jpg",
        width: 2400,
        height: 1080,
        alt: "Two pigs standing together in a sunlit pen at Boots and Barns.",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-ink">{children}</body>
    </html>
  );
}
