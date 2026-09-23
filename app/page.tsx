import { About } from "@/components/about";
import { Animals } from "@/components/animals";
import { Footer } from "@/components/footer";
import { Founders } from "@/components/founders";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PhotoCarousel } from "@/components/photo-carousel";
import { VideoCarousel } from "@/components/video-carousel";

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
        <PhotoCarousel />
        <VideoCarousel />
        <Founders />
      </main>
      <Footer />
    </div>
  );
}
