import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  CloudSun,
  Flower2,
  Focus,
  ImagePlus,
  Lightbulb,
  Ruler,
  ScanLine,
  Smartphone,
  XCircle,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Photography best practices ── */
const photoTips = [
  {
    icon: CloudSun,
    title: "Use natural daylight",
    text: "Photograph in natural light — overcast conditions produce even illumination without harsh shadows. Avoid flash, which can wash out subtle disease symptoms like early chlorosis or faint mould growth.",
  },
  {
    icon: Focus,
    title: "Focus on the affected area",
    text: "Centre the diseased portion of the leaf, stem, or fruit in the frame. The AI analyses textures, edges, and colour transitions — blurry or out-of-focus images significantly reduce diagnostic accuracy.",
  },
  {
    icon: Ruler,
    title: "Maintain proper distance",
    text: "Hold your camera 15–30 cm from the plant. Too close and the image becomes pixelated; too far and disease markers like tiny lesions, pustules, or mould filaments become invisible.",
  },
  {
    icon: ImagePlus,
    title: "Capture multiple angles",
    text: "If possible, photograph the upper surface, lower surface, and stem near the affected area. Many diseases show different symptoms on different parts — e.g., downy mildew appears on the leaf underside.",
  },
  {
    icon: Flower2,
    title: "Include a healthy comparison",
    text: "When feasible, include a healthy leaf from the same plant in a separate scan. This helps the AI establish a baseline for what 'normal' looks like for your specific crop variety and growth stage.",
  },
  {
    icon: Smartphone,
    title: "Clean your lens",
    text: "Field conditions mean dust, moisture, and fingerprints on your phone camera lens. A quick wipe with a clean cloth before scanning can measurably improve image clarity and diagnostic accuracy.",
  },
];

/* ── Do's and Don'ts ── */
const doItems = [
  "Photograph symptoms at multiple growth stages if the disease is spreading",
  "Scan freshly symptomatic tissue — severely decomposed leaves may not yield accurate results",
  "Use the scan history to compare symptoms across different dates and track disease progression",
  "Always cross-reference AI diagnoses with a local agricultural extension officer for critical decisions",
  "Remove excess soil or debris from roots before scanning for soil-borne disease symptoms",
];

const dontItems = [
  "Don't scan in direct harsh sunlight — it creates glare and washes out colour information",
  "Don't rely on a single scan for multi-symptom infections — scan different affected areas separately",
  "Don't apply pesticides based solely on AI diagnosis without professional consultation",
  "Don't scan wilted plants that have dried completely — active symptoms provide better diagnostic signals",
  "Don't upload photos of healthy plants expecting a clean bill of health — the AI is optimised for disease detection",
];

/* ── Supported crop categories ── */
const supportedCrops = [
  { name: "Cereals", examples: "Wheat, Rice, Maize, Barley, Sorghum" },
  { name: "Vegetables", examples: "Tomato, Potato, Pepper, Cucumber, Onion" },
  { name: "Fruits", examples: "Apple, Grape, Citrus, Banana, Mango" },
  { name: "Legumes", examples: "Soybean, Groundnut, Chickpea, Lentil" },
  { name: "Cash Crops", examples: "Cotton, Coffee, Tea, Sugarcane, Tobacco" },
  { name: "Oilseeds", examples: "Sunflower, Mustard, Sesame, Canola" },
];

export default function UserGuide() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      gsap.from("[data-guide-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-guide-header]",
          start: "top 85%",
          once: true,
        },
      });

      /* Photo tips cards */
      gsap.from("[data-photo-tip]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-photo-tip]",
          start: "top 85%",
          once: true,
        },
      });

      /* Do/Don't lists */
      gsap.from("[data-do-item]", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-do-list]",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from("[data-dont-item]", {
        x: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-dont-list]",
          start: "top 82%",
          once: true,
        },
      });

      /* Crops grid */
      gsap.from("[data-crop-card]", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "[data-crops-grid]",
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#F7F7F4] px-8 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-3xl text-center" data-guide-header>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            User guide
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
            Get the most accurate diagnosis from every scan.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
            The quality of your diagnosis depends on the quality of your
            photograph. Follow these field-tested guidelines to ensure Dr. Crop
            can identify symptoms with maximum accuracy.
          </p>
        </div>

        {/* ── Photography Best Practices ── */}
        <div className="mt-16">
          <div className="flex items-center gap-3" data-guide-header>
            <Camera aria-hidden="true" className="h-5 w-5 text-black" />
            <h3 className="font-display text-3xl text-black sm:text-4xl">
              Photography best practices
            </h3>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photoTips.map((tip) => (
              <article
                className="glass-panel rounded-[1.5rem] p-6"
                data-photo-tip
                key={tip.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <tip.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h4 className="font-display mt-4 text-2xl text-black">
                  {tip.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-[#6F6F6F]">
                  {tip.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Do's and Don'ts ── */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {/* Do's */}
          <div
            className="rounded-[2rem] border border-black/8 bg-white p-8"
            data-do-list
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <Lightbulb aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="font-display text-3xl text-black">
                Best practices
              </h3>
            </div>
            <div className="mt-6 grid gap-3">
              {doItems.map((item) => (
                <div
                  className="flex gap-3 text-sm leading-6 text-[#6F6F6F]"
                  data-do-item
                  key={item}
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-black"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div
            className="rounded-[2rem] border border-black/8 bg-white p-8"
            data-dont-list
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <AlertTriangle aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="font-display text-3xl text-black">
                Common mistakes
              </h3>
            </div>
            <div className="mt-6 grid gap-3">
              {dontItems.map((item) => (
                <div
                  className="flex gap-3 text-sm leading-6 text-[#6F6F6F]"
                  data-dont-item
                  key={item}
                >
                  <XCircle
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6F6F6F]/40"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Supported Crops ── */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center" data-guide-header>
            <div className="mx-auto flex items-center justify-center gap-3">
              <ScanLine aria-hidden="true" className="h-5 w-5 text-black" />
              <h3 className="font-display text-3xl text-black sm:text-4xl">
                Supported crop categories
              </h3>
            </div>
            <p className="mt-4 text-base leading-7 text-[#6F6F6F]">
              Dr. Crop's AI model is trained on diverse agricultural datasets
              spanning major crop families grown worldwide. Below are the
              primary categories supported.
            </p>
          </div>

          <div
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            data-crops-grid
          >
            {supportedCrops.map((crop) => (
              <article
                className="glass-panel rounded-[1.5rem] p-5"
                data-crop-card
                key={crop.name}
              >
                <h4 className="font-display text-2xl text-black">
                  {crop.name}
                </h4>
                <p className="mt-2 text-sm leading-6 text-[#6F6F6F]">
                  {crop.examples}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
