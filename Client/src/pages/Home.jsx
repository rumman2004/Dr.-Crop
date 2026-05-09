import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  BarChart3,
  Bug,
  Globe2,
  Leaf,
  ShieldCheck,
  TrendingDown,
  Users,
  Wheat,
} from "lucide-react";

import CTA from "../components/section/CTA";
import Hero from "../components/section/Hero";
import QNA from "../components/section/QNA";
import UserGuide from "../components/section/UserGuide";
import Working from "../components/section/Working";

gsap.registerPlugin(ScrollTrigger);

/* ── Global impact statistics ── */
const impactStats = [
  {
    icon: TrendingDown,
    figure: "40%",
    label: "Global crop loss",
    detail:
      "Up to 40% of the world's food crops are lost to plant pests and diseases every year, costing the global economy over $220 billion annually.",
    source: "FAO, 2023",
  },
  {
    icon: Users,
    figure: "500M+",
    label: "Smallholder farmers",
    detail:
      "More than 500 million smallholder farms produce around 80% of the food consumed in developing nations — yet most lack access to plant pathology expertise.",
    source: "IFAD, 2023",
  },
  {
    icon: Bug,
    figure: "10,000+",
    label: "Known plant pathogens",
    detail:
      "Over 10,000 species of fungi alone can cause plant diseases, along with hundreds of bacteria, viruses, and nematode species affecting crops worldwide.",
    source: "APS, 2022",
  },
  {
    icon: Globe2,
    figure: "2.7 km/yr",
    label: "Disease migration rate",
    detail:
      "Climate change is driving plant diseases toward the poles at an average rate of 2.7 kilometres per year, introducing devastating pathogens to new farming regions.",
    source: "Nature Climate Change, 2023",
  },
];

/* ── Common diseases spotlight ── */
const diseaseSpotlight = [
  {
    name: "Late Blight",
    pathogen: "Phytophthora infestans",
    crops: "Potato, Tomato",
    impact:
      "Responsible for the Irish Potato Famine (1845–1852). Still causes over $6.7 billion in global losses annually. Spreads explosively through wind-driven rain.",
  },
  {
    name: "Wheat Rust (Ug99)",
    pathogen: "Puccinia graminis",
    crops: "Wheat",
    impact:
      "Called the most feared crop disease on Earth. Threatens the food security of over 1 billion people who depend on wheat as a staple food.",
  },
  {
    name: "Rice Blast",
    pathogen: "Magnaporthe oryzae",
    crops: "Rice",
    impact:
      "The most important disease of rice globally, causing the loss of an estimated 60 million tonnes annually — enough to feed 60 million people.",
  },
  {
    name: "Panama Disease (TR4)",
    pathogen: "Fusarium oxysporum",
    crops: "Banana",
    impact:
      "Currently threatening the $25 billion global banana industry. The pathogen persists in soil for decades with no effective chemical cure available.",
  },
  {
    name: "Citrus Greening (HLB)",
    pathogen: "Candidatus Liberibacter",
    crops: "Citrus",
    impact:
      "The most destructive citrus disease worldwide. Florida's citrus production has declined by over 75% since HLB was first detected in 2005.",
  },
  {
    name: "Powdery Mildew",
    pathogen: "Erysiphales spp.",
    crops: "Wheat, Grapes, Cucurbits",
    impact:
      "One of the most widespread fungal diseases globally. Produces a characteristic white powdery coating and can reduce grain yields by 20–40%.",
  },
];

/* ── Why Dr. Crop section data ── */
const whyFeatures = [
  {
    icon: Leaf,
    title: "Structured, Not Guesswork",
    text: "Unlike simple image matching, Dr. Crop provides a comprehensive report — disease name, symptom breakdown, biological cause, treatment options, and prevention strategies. Every diagnosis is structured for field use.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    text: "We clearly communicate confidence levels and limitations. When the AI is uncertain, it says so. We never recommend aggressive chemical intervention without explicit safety warnings and always advise professional verification.",
  },
  {
    icon: BarChart3,
    title: "Disease Tracking Over Time",
    text: "Your scan history creates a chronological record of crop health across your fields. Track whether diseases are progressing, stabilising, or responding to treatment — enabling data-driven farm management decisions.",
  },
  {
    icon: Wheat,
    title: "Globally Trained Model",
    text: "Our AI is trained on diverse agricultural datasets spanning tropical, subtropical, and temperate crops. From rice paddy diseases in Southeast Asia to wheat rust in East Africa — Dr. Crop recognises pathologies across climates.",
  },
];

function ImpactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-impact-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-impact-header]",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from("[data-impact-card]", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-impact-grid]",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#F7F7F4] px-8 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center" data-impact-header>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            The global challenge
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
            Plant diseases are the silent crisis of global agriculture.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
            Every year, plant diseases destroy enough food to feed hundreds of
            millions of people. For smallholder farmers who produce the
            majority of the world's food, a single undetected outbreak can
            mean the difference between survival and ruin. Early identification
            is the most effective defence.
          </p>
        </div>

        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          data-impact-grid
        >
          {impactStats.map((stat) => (
            <article
              className="hairline-card rounded-[2rem] p-7 text-center"
              data-impact-card
              key={stat.figure}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <stat.icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <p className="font-display mt-5 text-4xl text-black sm:text-5xl">
                {stat.figure}
              </p>
              <p className="font-display mt-1 text-lg text-black/70">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#6F6F6F]">
                {stat.detail}
              </p>
              <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-black/25">
                {stat.source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DiseaseSpotlight() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-spotlight-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-spotlight-header]",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from("[data-spotlight-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "[data-spotlight-grid]",
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white px-8 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center" data-spotlight-header>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            Disease spotlight
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
            The diseases that cost billions and feed millions less.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
            These are some of the most economically devastating crop diseases
            on the planet. Dr. Crop is trained to identify their visual
            symptoms and provide structured treatment guidance.
          </p>
        </div>

        <div
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-spotlight-grid
        >
          {diseaseSpotlight.map((disease) => (
            <article
              className="hairline-card rounded-[2rem] p-7"
              data-spotlight-card
              key={disease.name}
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#F7F7F4] px-3 py-1 text-[11px] font-medium text-[#6F6F6F]">
                  {disease.crops}
                </span>
              </div>
              <h3 className="font-display mt-4 text-3xl text-black">
                {disease.name}
              </h3>
              <p className="mt-1 text-xs italic text-[#6F6F6F]/60">
                {disease.pathogen}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#6F6F6F]">
                {disease.impact}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyDrCrop() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-why-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-why-header]",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from("[data-why-card]", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: "[data-why-grid]",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from("[data-why-banner]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-why-banner]",
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
        <div className="mx-auto max-w-3xl text-center" data-why-header>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            Why Dr. Crop
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
            More than identification. Structured understanding.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
            Most plant disease apps stop at naming the disease. Dr. Crop goes
            further — explaining what's happening, why it's happening, and
            exactly what to do about it, with safety boundaries clearly marked.
          </p>
        </div>

        <div
          className="mt-14 grid gap-5 sm:grid-cols-2"
          data-why-grid
        >
          {whyFeatures.map((item) => (
            <article
              className="hairline-card rounded-[2rem] p-8"
              data-why-card
              key={item.title}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                <item.icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <h3 className="font-display mt-6 text-3xl text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
                {item.text}
              </p>
            </article>
          ))}
        </div>

        {/* ── Safety banner ── */}
        <div
          className="mt-14 rounded-[2rem] border border-black/8 bg-white p-8"
          data-why-banner
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-black text-white">
              <AlertTriangle aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-black">
                Important safety note
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6F6F6F]">
                Dr. Crop is designed as an early-warning and guidance tool, not
                a replacement for professional agronomic consultation. The World
                Health Organization estimates approximately 385 million cases of
                acute pesticide poisoning occur worldwide each year — many
                resulting from incorrect identification and application.
                Always verify critical decisions involving chemical treatments,
                quarantine measures, or crop destruction with a qualified local
                agriculture expert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactSection />
      <Working />
      <DiseaseSpotlight />
      <UserGuide />
      <WhyDrCrop />
      <QNA />
      <CTA />
    </>
  );
}
