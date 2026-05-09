import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const questions = [
  {
    question: "What types of crop diseases can Dr. Crop identify?",
    answer:
      "Dr. Crop can identify a wide range of plant diseases across major crop families including cereals, vegetables, fruits, legumes, and cash crops. This includes common diseases like Late Blight (potato/tomato), Bacterial Leaf Blight (rice), Powdery Mildew (wheat/grapes), Fusarium Wilt (banana/tomato), Citrus Canker, Rust Diseases (wheat/coffee), Rice Blast, and many more. The AI model is continuously trained on new pathological data to expand its diagnostic capabilities.",
  },
  {
    question: "How accurate is the AI diagnosis?",
    answer:
      "In controlled studies, computer vision models of the class used by Dr. Crop have demonstrated identification accuracy rates exceeding 95%. However, real-world accuracy depends on several factors — image quality, lighting conditions, disease stage, and whether multiple diseases are present simultaneously. Dr. Crop should be treated as a powerful early-warning and guidance tool, not a replacement for professional agronomic consultation. For critical decisions involving pesticide application or crop destruction, always verify with a qualified agriculture expert.",
  },
  {
    question: "Do I need any special equipment to use Dr. Crop?",
    answer:
      "No special equipment is required. Any smartphone with a camera and internet connection is sufficient. For best results, photograph the affected plant part in natural daylight from a distance of 15–30 cm, ensuring the diseased area is clearly in focus. Avoid using flash, as it can wash out subtle disease symptoms. A clean camera lens also helps — field conditions often leave dust or moisture on your phone camera.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. Your crop images are processed through a secure backend pipeline. API keys are stored server-side and never exposed to the browser. Uploaded images are stored on Cloudinary's encrypted infrastructure, and diagnosis records are saved in a secure MongoDB database. Your scan history is private and accessible only to you.",
  },
  {
    question: "Can Dr. Crop diagnose diseases in real time?",
    answer:
      "Dr. Crop processes uploaded images and returns a structured diagnosis report typically within 5–15 seconds, depending on image size and network speed. While not technically 'real-time' in the sense of live video analysis, the turnaround is fast enough for practical field use — you can scan multiple plants across your field in a single session.",
  },
  {
    question: "What should I do if the AI identifies a serious disease?",
    answer:
      "If Dr. Crop identifies a potentially devastating disease — such as Late Blight, Panama Disease (Fusarium TR4), or a quarantine pest — the first step is to avoid panic and NOT immediately apply broad-spectrum pesticides. Instead: (1) Isolate the affected plants if possible, (2) Take additional scans of surrounding plants to assess spread, (3) Contact your local agricultural extension office or a certified agronomist with the diagnosis report, and (4) Follow their professional guidance for treatment and containment.",
  },
  {
    question: "Can I scan the same plant multiple times to track disease progression?",
    answer:
      "Absolutely. This is one of the most valuable features of Dr. Crop. By scanning the same plant or field area across multiple dates, you build a visual and diagnostic timeline that helps you understand whether the disease is progressing, stabilising, or responding to treatment. Your scan history page displays all past diagnoses chronologically, making it easy to compare results over time.",
  },
  {
    question: "Does Dr. Crop work for all geographic regions?",
    answer:
      "Dr. Crop's AI model is trained on global agricultural datasets and can identify diseases found across diverse climatic regions — from tropical to temperate zones. However, certain diseases are region-specific, and environmental factors (soil type, humidity, altitude) can influence symptom presentation. While the AI provides a strong starting point, we always recommend confirming diagnoses with local agricultural experts who understand your specific growing conditions.",
  },
  {
    question: "What happens if the AI can't identify the disease?",
    answer:
      "If the AI confidence is low or the symptoms don't match known patterns in our database, Dr. Crop will clearly indicate this in the report rather than providing a potentially inaccurate diagnosis. In such cases, the report will suggest possible disease categories, recommend additional photographs from different angles, and advise consulting a plant pathologist. Transparency about uncertainty is a core design principle of Dr. Crop.",
  },
  {
    question: "Is Dr. Crop free to use?",
    answer:
      "Dr. Crop is currently available as a free diagnostic tool. Our mission is to make crop disease identification accessible to every farmer regardless of economic background. The platform is designed to work on low-bandwidth connections and basic smartphones to ensure maximum accessibility for smallholder farmers in developing regions.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        rotation: isOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <article className="border-b border-black/10 last:border-b-0">
      <button
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-black/70"
        onClick={onToggle}
        type="button"
      >
        <h3 className="font-display text-2xl text-black sm:text-3xl">
          {item.question}
        </h3>
        <span ref={arrowRef}>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 flex-shrink-0 text-[#6F6F6F]"
          />
        </span>
      </button>
      <div className="h-0 overflow-hidden opacity-0" ref={contentRef}>
        <p className="pb-6 text-sm leading-7 text-[#6F6F6F]">
          {item.answer}
        </p>
      </div>
    </article>
  );
}

export default function QNA() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-qna-header]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-qna-header]",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from("[data-qna-container]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-qna-container]",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from("[data-qna-note]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-qna-note]",
          start: "top 90%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white px-8 py-28" ref={sectionRef}>
      <div className="mx-auto max-w-4xl">
        {/* ── Header ── */}
        <div className="text-center" data-qna-header>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            Frequently asked questions
          </p>
          <h2 className="font-display mt-4 text-5xl leading-none tracking-tight text-black sm:text-6xl">
            Everything you need to know about Dr. Crop.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#6F6F6F]">
            Common questions about our AI crop diagnosis platform, from
            accuracy and data security to practical field usage.
          </p>
        </div>

        {/* ── Accordion ── */}
        <div
          className="mt-12 rounded-[2rem] border border-black/10 bg-white px-6 sm:px-8"
          data-qna-container
        >
          {questions.map((item, index) => (
            <AccordionItem
              isOpen={openIndex === index}
              item={item}
              key={item.question}
              onToggle={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
            />
          ))}
        </div>

        {/* ── Support note ── */}
        <div
          className="mt-8 flex items-start gap-3 rounded-[1.5rem] bg-[#F7F7F4] p-6"
          data-qna-note
        >
          <HelpCircle
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-black/40"
          />
          <p className="text-sm leading-6 text-[#6F6F6F]">
            Still have questions? Visit our{" "}
            <a
              className="font-medium text-black underline decoration-black/20 underline-offset-2 transition-colors hover:decoration-black"
              href="/reach"
            >
              Reach Us
            </a>{" "}
            page to share your feedback, ask technical questions, or suggest
            improvements. We typically respond within 24–48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
