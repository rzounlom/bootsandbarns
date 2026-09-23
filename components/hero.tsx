"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import Image from "next/image";
import { heroVideo } from "@/lib/media";

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-olive text-paper">
      <div className="hero-grid mx-auto grid max-w-7xl items-center md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="hero-copy order-2 flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 md:order-1 md:py-16 lg:px-12 lg:py-20">
          <p className="kicker text-marigold">Ikot-Ekpene, Nigeria</p>
          <h1
            id="hero-heading"
            className="hero-title mt-4 font-sans text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-paper min-[380px]:text-[2.45rem] md:text-[2.6rem] lg:text-5xl xl:text-[3.4rem]"
          >
            A family farm,
            <br />
            still at work.
          </h1>
          <p className="hero-lede mt-5 max-w-[34ch] text-lg leading-relaxed text-cream sm:text-xl">
            We raise pigs, grow food, and carry forward our father’s hope of
            giving back.
          </p>
          <div className="hero-cta mt-8">
            <a href="#about" className="btn">
              About the farm
            </a>
          </div>
        </div>

        <div className="hero-photo order-1 md:order-2 md:py-8 md:pr-8 lg:py-10 lg:pr-10">
          <div className="relative aspect-video max-h-[54svh] overflow-hidden bg-olive-mid shadow-[0_24px_50px_-28px_rgb(0_0_0/0.7)] md:max-h-none md:rounded-[1.75rem]">
            <HeroFilm />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroFilm() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const wantsSound = useRef(true);
  const soundOn = useRef(false);
  const attachVideo = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (!node) return;
    node.defaultMuted = true;
    node.muted = true;
  }, []);
  const reduceMotion = useSyncExternalStore(
    subscribeToMotion,
    motionSnapshot,
    () => false,
  );
  const [engaged, setEngaged] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const showPlayer = !failed && (!reduceMotion || engaged);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame || !showPlayer) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !engaged
    )
      return;

    const playIfAllowed = () => {
      if (userPaused.current) return;

      const policy = (
        navigator as Navigator & {
          getAutoplayPolicy?: (type: string) => string;
        }
      ).getAutoplayPolicy?.("mediaelement");
      const startWithSound = wantsSound.current && policy === "allowed";
      video.muted = !startWithSound;
      video.volume = 1;

      video
        .play()
        .then(() => {
          if (!wantsSound.current || userPaused.current || startWithSound) {
            setMuted(video.muted);
            return;
          }

          video.muted = false;
          video.volume = 1;
          window.setTimeout(() => {
            if (userPaused.current) return;
            if (!video.paused) {
              setMuted(false);
              return;
            }
            video.muted = true;
            setMuted(true);
            video.play().catch(() => setPlaying(false));
          }, 80);
        })
        .catch(() => {
          if (!video.muted) {
            video.muted = true;
            setMuted(true);
            video.play().catch(() => setPlaying(false));
            return;
          }
          setPlaying(false);
        });
    };

    playIfAllowed();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || userPaused.current) return;
        if (entry.isIntersecting) playIfAllowed();
        else video.pause();
      },
      { threshold: 0.15 },
    );

    observer.observe(frame);

    const unlockSound = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-hero-control]"))
        return;
      const player = videoRef.current;
      if (!player || !wantsSound.current || userPaused.current) return;
      player.muted = false;
      player.volume = 1;
      soundOn.current = true;
      setMuted(false);
      player.play().catch(() => setPlaying(false));
    };

    document.addEventListener("pointerdown", unlockSound);

    return () => {
      observer.disconnect();
      document.removeEventListener("pointerdown", unlockSound);
    };
  }, [engaged, showPlayer]);

  function togglePlayback() {
    if (failed) return;
    if (!showPlayer) {
      userPaused.current = false;
      setEngaged(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  function toggleSound() {
    if (failed) return;
    const video = videoRef.current;
    const nextMuted = video ? !video.muted : !muted;

    if (!showPlayer) {
      setMuted(false);
      userPaused.current = false;
      setEngaged(true);
      return;
    }

    if (!video) return;
    wantsSound.current = !nextMuted;
    video.muted = nextMuted;
    if (!nextMuted) video.volume = 1;
    setMuted(nextMuted);

    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setPlaying(false));
    }
  }

  const paused = !showPlayer || !playing;

  return (
    <div ref={frameRef} className="absolute inset-0 bg-olive-mid">
      {showPlayer ? (
        <video
          ref={attachVideo}
          className="h-full w-full object-cover"
          autoPlay
          muted={muted}
          playsInline
          loop
          preload="auto"
          poster={heroVideo.poster}
          aria-label={heroVideo.label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={heroVideo.src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={heroVideo.poster}
          alt={heroVideo.label}
          fill
          preload
          sizes="(min-width: 768px) 54vw, 100vw"
          className="object-cover"
        />
      )}

      {failed ? null : (
        <div
          data-hero-control=""
          className="absolute right-3 bottom-3 flex items-center gap-2"
        >
          <button
            type="button"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-paper/92 px-3 text-sm font-semibold text-ink shadow-[0_8px_20px_-12px_rgb(0_0_0/0.8)]"
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            aria-pressed={!muted}
            onClick={toggleSound}
          >
            {muted ? <SoundOffIcon /> : <SoundOnIcon />}
            <span>{muted ? "Sound" : "Mute"}</span>
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-paper/92 text-ink shadow-[0_8px_20px_-12px_rgb(0_0_0/0.8)]"
            aria-label={paused ? "Play farm video" : "Pause farm video"}
            aria-pressed={!paused}
            onClick={togglePlayback}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      )}
    </div>
  );
}

function SoundOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M4 10v4h3.2L12 18.2V5.8L7.2 10H4zm13.1 2l2.2-2.2-1.1-1.1L16 10.9l-2.2-2.2-1.1 1.1L14.9 12l-2.2 2.2 1.1 1.1L16 13.1l2.2 2.2 1.1-1.1L17.1 12z"
        fill="currentColor"
      />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path
        d="M4 10v4h3.2L12 18.2V5.8L7.2 10H4zm10.2-2.6v9.2a4.2 4.2 0 0 0 0-9.2zm0 2.3a1.9 1.9 0 0 1 0 4.6V9.7z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 size-5">
      <path d="M8 6.5v11l9-5.5-9-5.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
      <path d="M7 6h3.2v12H7V6zm6.8 0H17v12h-3.2V6z" fill="currentColor" />
    </svg>
  );
}
