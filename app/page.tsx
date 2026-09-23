import { About } from "@/components/about";
import { Animals } from "@/components/animals";
import { Footer } from "@/components/footer";
import { Founders } from "@/components/founders";
import { Gallery } from "@/components/gallery";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Animals />
        <Gallery />
        <Founders />
      </main>
      <Footer />
    </div>
  );
}
