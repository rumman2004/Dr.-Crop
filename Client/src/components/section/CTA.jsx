import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Globe,
  ScanLine,
  Shield,
  Wifi,
} from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Clock,
    text: "Results in under 15 seconds",
  },
  {
    icon: Shield,
    text: "No sign-up required",
  },
  {
    icon: Wifi,
    text: "Works on any device with a camera",
  },
  {
    icon: Globe,
    text: "Supports 50+ crop diseases worldwide",
  },
];

export default function CTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-cta-content]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from("[data-cta-highlight]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-cta-highlights]",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from("[data-cta-buttons]", {
        y: 20,
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-cta-buttons]",
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-8 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-black p-10 text-white sm:p-14">
        {/* ── Main message ── */}
        <div
          className="mx-auto max-w-3xl text-center"
          data-cta-content
        >
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/50">
            Start diagnosing
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none sm:text-6xl">
            Your crops are speaking. Let AI help you listen.
          </h2>
          <p className="mt-6 text-base leading-7 text-white/60">
            Every hour a plant disease goes undetected, it spreads further.
            Dr. Crop gives you the ability to identify crop diseases in the
            field, on the spot, with nothing more than your phone camera. Upload
            a photograph and receive a structured diagnosis report — disease
            name, symptoms, causes, treatment, and prevention — in seconds.
          </p>
        </div>

        {/* ── Highlights ── */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-4"
          data-cta-highlights
        >
          {highlights.map((item) => (
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/70"
              data-cta-highlight
              key={item.text}
            >
              <item.icon aria-hidden="true" className="h-4 w-4 text-white/40" />
              {item.text}
            </div>
          ))}
        </div>

        {/* ── Buttons ── */}
        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          data-cta-buttons
        >
          <Link
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-10 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            to="/studio"
          >
            <ScanLine aria-hidden="true" className="h-5 w-5" />
            Scan Disease Now
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/15 px-10 text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/10"
            to="/journal"
          >
            <BookOpen aria-hidden="true" className="h-4 w-4" />
            Read the Journal
          </Link>
        </div>

        {/* ── Trust line ── */}
        <p
          className="mt-8 text-center text-xs text-white/30"
          data-cta-content
        >
          AI-powered guidance — always confirm critical agricultural
          decisions with a qualified expert.
        </p>
      </div>
    </section>
  );
}
