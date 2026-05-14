import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowRight, Download, Leaf, ScanLine } from "lucide-react";

/* ── Update this URL after each EAS build ── */
const APK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=18VqSEamLpBba963Q3TwUU6MZP3k1fjQw&confirm=true";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

export default function Hero() {
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);
  const heroRef = useRef(null);

  /* ── Video fade-loop logic ── */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const fadeDuration = 0.5;

    const updateOpacity = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < fadeDuration) {
          video.style.opacity = String(currentTime / fadeDuration);
        } else if (duration - currentTime < fadeDuration) {
          video.style.opacity = String(
            Math.max((duration - currentTime) / fadeDuration, 0),
          );
        } else {
          video.style.opacity = "1";
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateOpacity);
    };

    const replay = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", replay);
    video.play().catch(() => {});
    animationFrameRef.current = requestAnimationFrame(updateOpacity);

    return () => {
      video.removeEventListener("ended", replay);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", {
        y: -20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          "[data-hero-heading]",
          {
            y: 60,
            opacity: 0,
            duration: 1,
          },
          "-=0.3",
        )
        .from(
          "[data-hero-sub]",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          "[data-hero-cta]",
          {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
          },
          "-=0.3",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#FFFFFF]"
      ref={heroRef}
    >
      {/* ── Background video ── */}
      <div
        className="absolute z-0 overflow-hidden"
        style={{ top: "300px", right: 0, bottom: 0, left: 0 }}
      >
        <video
          aria-hidden="true"
          className="h-full w-full object-cover opacity-0"
          muted
          playsInline
          preload="auto"
          ref={videoRef}
          src={VIDEO_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-32 text-center">
        <div style={{ paddingTop: "calc(8rem - 75px)" }} />

        <p
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm text-[#6F6F6F] backdrop-blur-xl"
          data-hero-badge
        >
          <Leaf aria-hidden="true" className="h-4 w-4 text-black" />
          AI-powered crop disease diagnosis
        </p>

        <h1
          className="font-display max-w-5xl text-5xl font-normal text-[#000000] sm:text-7xl md:text-8xl"
          data-hero-heading
          style={{ lineHeight: 0.95, letterSpacing: "-2.46px" }}
        >
          Your crop's health,{" "}
          <span className="italic text-[#6F6F6F]">diagnosed.</span>
        </h1>

        <p
          className="mt-8 max-w-xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg"
          data-hero-sub
        >
          Photograph a plant. Get a structured disease report in seconds.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row" data-hero-cta>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-[#000000] px-14 py-5 text-base font-medium text-[#FFFFFF] transition-transform hover:scale-[1.03]"
            to="/studio"
          >
            <ScanLine aria-hidden="true" className="h-5 w-5" />
            Scan Disease
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-8 py-5 text-base font-medium text-black transition-all hover:border-black hover:bg-black hover:text-white"
            href={APK_DOWNLOAD_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Download aria-hidden="true" className="h-4 w-4" />
            Download App
          </a>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-8 py-5 text-base font-medium text-black transition-all hover:border-black hover:bg-black hover:text-white"
            to="/about"
          >
            Learn More
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
