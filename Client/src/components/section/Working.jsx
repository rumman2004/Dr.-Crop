import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Camera,
  ClipboardList,
  FileSearch,
  Microscope,
  PillBottle,
  ShieldAlert,
  Sprout,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

/* ── Primary workflow steps ── */
const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Capture the symptom",
    text: "Take a clear photograph of the affected leaf, stem, fruit, or root. Use natural daylight and hold the camera 15–30 cm away for best results. Dr. Crop analyses visual patterns like discolouration, lesion shape, mould growth, and wilting behaviour.",
    tip: "Tip: Photograph both the affected area and a healthy part of the same plant for comparison.",
  },
  {
    number: "02",
    icon: Microscope,
    title: "AI-powered analysis",
    text: "Our computer vision model examines the uploaded image against thousands of documented plant pathologies. It identifies visual markers — chlorotic patterns, necrotic spots, fungal sporulation, bacterial ooze, and viral mosaics — to determine the most likely disease.",
    tip: "The analysis considers crop type, symptom distribution, and lesion characteristics simultaneously.",
  },
  {
    number: "03",
    icon: ClipboardList,
    title: "Structured diagnosis report",
    text: "You receive a comprehensive report organised into clear sections: Disease Identification, Observable Symptoms, Probable Causes (fungal, bacterial, viral, or environmental), Recommended Treatment, and Long-Term Prevention Strategies.",
    tip: "Reports are designed for field use — concise enough to read on a phone in bright sunlight.",
  },
  {
    number: "04",
    icon: FileSearch,
    title: "Archived for future reference",
    text: "Every scan is securely stored with its image and diagnosis report. Over time, this builds a disease history for your fields — allowing you to track seasonal patterns, identify recurring issues, and make data-informed crop management decisions.",
    tip: "Access your complete scan history anytime from the History page.",
  },
];

/* ── What the diagnosis covers ── */
const coverageItems = [
  {
    icon: Sprout,
    title: "Disease Identification",
    text: "The specific disease name, pathogen type (fungal, bacterial, viral, or abiotic), and its scientific classification when applicable.",
  },
  {
    icon: FileSearch,
    title: "Symptom Analysis",
    text: "Detailed breakdown of visible symptoms — including lesion patterns, discolouration, wilting stages, and how symptoms differ from similar diseases.",
  },
  {
    icon: Zap,
    title: "Root Cause Explanation",
    text: "The biological or environmental causes behind the disease, including how pathogens spread, favourable conditions for infection, and host susceptibility factors.",
  },
  {
    icon: PillBottle,
    title: "Treatment Recommendations",
    text: "Evidence-based treatment options ranging from cultural practices and biological controls to chemical interventions, with application guidance and safety precautions.",
  },
  {
    icon: ShieldAlert,
    title: "Prevention Strategies",
    text: "Long-term measures to prevent recurrence — including crop rotation schedules, resistant varieties, soil health management, and Integrated Pest Management (IPM) practices.",
  },
  {
    icon: ClipboardList,
    title: "Next Steps",
    text: "Actionable recommendations for what to do immediately, when to consult a local agronomist, and how to monitor the crop for signs of recovery or further spread.",
  },
];

export default function Working() {
  const sectionRef = useRef(null);
  const stepsRef = useRef(null);
  const coverageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header animation */
      gsap.from("[data-working-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-working-header]",
          start: "top 85%",
          once: true,
        },
      });

      /* Steps stagger */
      if (stepsRef.current) {
        gsap.from(stepsRef.current.querySelectorAll("[data-step]"), {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      /* Coverage cards */
      if (coverageRef.current) {
        gsap.from(coverageRef.current.querySelectorAll("[data-coverage]"), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: coverageRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white px-8 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center" data-working-header>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            How it works
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
            From photograph to diagnosis in four clear steps.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
            Dr. Crop transforms a simple crop photograph into a comprehensive,
            structured disease report. No specialist equipment required — just
            a phone camera and an internet connection.
          </p>
        </div>

        {/* ── Step-by-step workflow ── */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2" ref={stepsRef}>
          {steps.map((step) => (
            <article
              className="hairline-card relative overflow-hidden rounded-[2rem] p-8"
              data-step
              key={step.number}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black text-white">
                  <step.icon aria-hidden="true" className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg text-black/20">
                      {step.number}
                    </span>
                    <h3 className="font-display text-3xl text-black">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
                    {step.text}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#F7F7F4] px-4 py-2 text-xs text-[#6F6F6F]">
                    <Sprout
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-black/40"
                    />
                    {step.tip}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── What the diagnosis covers ── */}
        <div className="mt-20" data-working-header>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
              Diagnosis breakdown
            </p>
            <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
              Every report covers six critical areas.
            </h2>
            <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
              Unlike simple identification tools that only name the disease,
              Dr. Crop provides the full picture — from what's happening to
              your crop, to why it's happening, and exactly what to do about it.
            </p>
          </div>
        </div>

        <div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          ref={coverageRef}
        >
          {coverageItems.map((item) => (
            <article
              className="hairline-card rounded-[2rem] p-6"
              data-coverage
              key={item.title}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                <item.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-5 text-2xl text-black">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6F6F6F]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* ── Inline CTA ── */}
        <div className="mt-12 text-center">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-8 py-4 text-sm font-medium text-black transition-all hover:border-black hover:bg-black hover:text-white"
            to="/studio"
          >
            Try it now — scan a crop image
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
