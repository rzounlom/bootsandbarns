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
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
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

    const playIfAllowed = () => {
      if (userPaused.current) return;
      video.muted = !soundOn.current;
      if (!video.muted) video.volume = 1;
      video.play().catch(() => {
        if (!video.muted) {
          video.muted = true;
          soundOn.current = false;
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
    return () => observer.disconnect();
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
      soundOn.current = true;
      setMuted(false);
      userPaused.current = false;
      setEngaged(true);
      return;
    }

    if (!video) return;
    soundOn.current = !nextMuted;
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
    <section
      aria-labelledby="hero-heading"
      className="hero-shell relative min-h-[100svh] overflow-hidden bg-olive text-paper"
    >
      <div ref={frameRef} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroVideo.poster})` }}
        />
        {showPlayer ? (
          <video
            ref={attachVideo}
            className="absolute inset-0 h-full w-full object-cover object-center"
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
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
        <div className="hero-scrim pointer-events-none absolute inset-0" />
      </div>

      <div className="hero-copy-wrap relative z-10 flex min-h-[100svh] w-full min-w-0 items-end px-5 pt-28 pb-28 pointer-events-none sm:px-8 md:items-center md:px-12 md:pt-32 md:pb-20 lg:px-16">
        <div className="hero-enter hero-copy pointer-events-auto w-full min-w-0 max-w-[40rem]">
          <p className="kicker text-marigold">Ikot-Ekpene, Nigeria</p>
          <h1
            id="hero-heading"
            className="hero-title mt-4 font-sans text-[2.55rem] font-semibold leading-[1.02] tracking-tight text-paper min-[380px]:text-[2.9rem] sm:text-6xl lg:text-7xl"
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
      </div>

      {failed ? null : (
        <div
          data-hero-control=""
          className="hero-controls absolute right-4 bottom-4 z-20 flex items-center gap-2 sm:right-6 sm:bottom-6"
        >
          <button
            type="button"
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-paper/95 px-3 text-sm font-semibold text-ink shadow-[0_10px_24px_-14px_rgb(0_0_0/0.85)] transition hover:-translate-y-0.5"
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            aria-pressed={!muted}
            onClick={toggleSound}
          >
            {muted ? <SoundOffIcon /> : <SoundOnIcon />}
            <span>{muted ? "Sound" : "Mute"}</span>
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-paper/95 text-ink shadow-[0_10px_24px_-14px_rgb(0_0_0/0.85)] transition hover:-translate-y-0.5"
            aria-label={paused ? "Play farm video" : "Pause farm video"}
            aria-pressed={!paused}
            onClick={togglePlayback}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      )}
    </section>
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
