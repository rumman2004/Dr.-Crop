import { useState } from "react";
import {
  BookOpen,
  Camera,
  CreditCard,
  LifeBuoy,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ── Quick help topics ── */
const topics = [
  {
    icon: Camera,
    title: "Capturing good photos",
    text: "Use natural daylight, hold the camera steady, and fill the frame with the affected leaf, stem, or fruit for the most accurate diagnosis.",
  },
  {
    icon: ScanLine,
    title: "Running a scan",
    text: "Open the Studio, upload or capture an image, and receive a structured disease report in seconds — no setup required.",
  },
  {
    icon: CreditCard,
    title: "Credits & billing",
    text: "Every account gets 5 free credits daily. Need more? Explore paid plans on the Pricing page. Payments are handled securely via Stripe.",
  },
  {
    icon: ShieldCheck,
    title: "Account & privacy",
    text: "Your uploaded images are used only to generate your diagnosis and improve accuracy. Manage your account any time from the sign-in menu.",
  },
];

/* ── Frequently asked questions ── */
const faqs = [
  {
    q: "How many free scans do I get?",
    a: "Every registered user receives 5 free diagnosis credits each day. Credits reset daily and do not roll over. If you need more, you can upgrade on the Pricing page.",
  },
  {
    q: "Why is my diagnosis not accurate?",
    a: "Accuracy depends heavily on image quality. Blurry photos, poor lighting, or partial views of the plant reduce reliability. Retake the photo in daylight, filling the frame with the affected area, and try again. Remember that Dr. Crop is a decision-support tool — confirm critical treatment decisions with a qualified agronomist.",
  },
  {
    q: "What crops and diseases are supported?",
    a: "Dr. Crop recognises a wide range of common crop pathologies including Late Blight, Bacterial Leaf Blight, Powdery Mildew, Citrus Canker, Fusarium Wilt, and various rust diseases across staple and cash crops. See the About page for more detail.",
  },
  {
    q: "How do I get a refund?",
    a: "Payments are non-refundable once the associated credits have been consumed. If you believe you were charged in error, contact us at support@drcrop.app within 14 days and we will review your case.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. Uploaded images are processed only to generate your report and improve diagnostic quality. We do not sell your data. See our Terms & Conditions for full details.",
  },
  {
    q: "Can I use Dr. Crop on my phone?",
    a: "Absolutely. The web app works on any device with a camera and internet connection, and a dedicated Android app is available to download from the home page.",
  },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="hairline-card rounded-[2rem] p-6">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="font-display text-xl text-black sm:text-2xl">
          {faq.q}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
          {open ? (
            <Minus aria-hidden="true" className="h-4 w-4" />
          ) : (
            <Plus aria-hidden="true" className="h-4 w-4" />
          )}
        </span>
      </button>
      {open && (
        <p className="mt-4 text-sm leading-7 text-[#6F6F6F]">{faq.a}</p>
      )}
    </article>
  );
}

export default function Support() {
  return (
    <section className="bg-white px-8 py-16">
      <div className="mx-auto max-w-6xl">
        {/* ── Header ── */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            Support
          </p>
          <h1 className="font-display mt-4 text-6xl leading-none tracking-tight text-black sm:text-7xl">
            We're here to help.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#6F6F6F]">
            Find quick answers, learn how to get the most accurate diagnosis, or
            reach out to our team directly. Whatever your fields are facing, we
            want Dr. Crop to work for you.
          </p>
        </div>

        {/* ── Quick help topics ── */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <article
              className="hairline-card rounded-[2rem] p-6"
              key={topic.title}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                <topic.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="font-display mt-5 text-2xl text-black">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#6F6F6F]">
                {topic.text}
              </p>
            </article>
          ))}
        </div>

        {/* ── FAQ ── */}
        <div className="mt-16">
          <div className="flex items-center gap-3">
            <BookOpen aria-hidden="true" className="h-6 w-6 text-black" />
            <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="mt-8 grid gap-4">
            {faqs.map((faq) => (
              <FaqItem faq={faq} key={faq.q} />
            ))}
          </div>
        </div>

        {/* ── Contact CTA ── */}
        <div className="mt-16 rounded-[2.5rem] bg-black p-8 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <LifeBuoy aria-hidden="true" className="h-6 w-6" />
            <h2 className="font-display text-4xl leading-none sm:text-5xl">
              Still need a hand?
            </h2>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            Our team typically responds within 24 to 48 hours. Send us a message
            with as much detail as you can — including screenshots or the scan in
            question — and we'll get you back on track.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
              to="/reach"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              Contact us
            </Link>
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black"
              href="mailto:support@drcrop.app"
            >
              <Mail aria-hidden="true" className="h-5 w-5" />
              support@drcrop.app
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
