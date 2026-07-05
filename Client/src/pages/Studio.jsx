import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  CloudSun,
  Eye,
  Focus,
  ImageUp,
  Leaf,
  Ruler,
  ScanLine,
  Shield,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

import ImageUploadModal from "../components/ui/ImageUploadModal";
import { useAuth } from "../context/AuthContext";

/* ── What the report includes ── */
const reportSections = [
  "Disease identification with pathogen type",
  "Visible symptom breakdown",
  "Biological and environmental causes",
  "Immediate treatment actions",
  "Organic and cultural management options",
  "Long-term prevention strategies",
];

/* ── Photography tips ── */
const photoTips = [
  {
    icon: CloudSun,
    text: "Use natural daylight — avoid flash",
  },
  {
    icon: Focus,
    text: "Keep the affected area in sharp focus",
  },
  {
    icon: Ruler,
    text: "Hold camera 15–30 cm from the plant",
  },
  {
    icon: Smartphone,
    text: "Clean your lens before scanning",
  },
];

/* ── Accepted formats ── */
const formats = ["JPG", "PNG", "WEBP"];

export default function Studio() {
  const pageRef = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-studio-aside] > *", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });

      gsap.from("[data-studio-upload]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white px-6 py-10 sm:px-8" ref={pageRef}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* ── Left sidebar ── */}
          <aside
            className="lg:sticky lg:top-28 lg:self-start"
            data-studio-aside
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-[#6F6F6F]">
              <ScanLine aria-hidden="true" className="h-4 w-4 text-black" />
              Diagnostic Studio
            </div>

            {/* Heading */}
            <h1 className="font-display mt-6 max-w-xl text-5xl leading-none tracking-tight text-black sm:text-6xl lg:text-7xl">
              Scan. Diagnose. Protect.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#6F6F6F]">
              Upload a clear photograph of an affected crop — leaf, stem, fruit,
              or root — and receive a structured disease report within seconds.
            </p>

            {/* ── Report includes ── */}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
                <Eye aria-hidden="true" className="h-3.5 w-3.5 text-black" />
                Your report includes
              </div>
              <div className="mt-4 grid gap-2">
                {reportSections.map((item) => (
                  <div
                    className="flex items-start gap-2.5 text-sm leading-6 text-[#6F6F6F]"
                    key={item}
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-black"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Photo tips ── */}
            <div className="mt-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
                <ImageUp
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-black"
                />
                For best results
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {photoTips.map((tip) => (
                  <div
                    className="flex items-start gap-2.5 rounded-xl bg-[#F7F7F4] px-3.5 py-3 text-xs leading-5 text-[#6F6F6F]"
                    key={tip.text}
                  >
                    <tip.icon
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-black/50"
                    />
                    {tip.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Accepted formats ── */}
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs font-medium text-[#6F6F6F]">
                Accepted:
              </span>
              <div className="flex gap-1.5">
                {formats.map((fmt) => (
                  <span
                    className="rounded-md bg-[#F7F7F4] px-2.5 py-1 text-[11px] font-medium text-[#6F6F6F]"
                    key={fmt}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Safety note ── */}
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-black/8 bg-white p-4">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#6F6F6F]/50"
              />
              <p className="text-xs leading-5 text-[#6F6F6F]">
                AI diagnosis is guidance, not a replacement for professional
                consultation. Always verify chemical treatments and critical
                decisions with a qualified agronomist.
              </p>
            </div>

            {/* ── Links ── */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black hover:bg-black hover:text-white"
                to="/history"
              >
                <Clock aria-hidden="true" className="h-4 w-4" />
                Scan history
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black hover:bg-black hover:text-white"
                to="/about"
              >
                <Leaf aria-hidden="true" className="h-4 w-4" />
                How it works
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>

          {/* ── Right side: Upload area ── */}
          <div data-studio-upload>
            {!token ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-black/10 bg-[#F7F7F4] p-8 text-center">
                <Shield aria-hidden="true" className="h-12 w-12 text-black/20" />
                <h3 className="font-display mt-6 text-2xl text-black">Sign in to start scanning</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-[#6F6F6F]">
                  Join Dr. Crop to analyze your plant images and save your diagnostic history securely.
                </p>
                <div className="mt-8 flex gap-3">
                  <Link to="/login" className="inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/90">
                    Sign in
                  </Link>
                  <Link to="/signup" className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-sm font-medium text-black transition hover:border-black hover:bg-[#F7F7F4]">
                    Create account
                  </Link>
                </div>
              </div>
            ) : (
              <ImageUploadModal />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
