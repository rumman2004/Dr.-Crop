import {
  AlertTriangle,
  ArrowRight,
  Beaker,
  BookOpen,
  CalendarDays,
  Clock,
  Leaf,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchJournals } from "../api/cropApi";

/* ── Quick facts sidebar ── */
const quickFacts = [
  {
    icon: Leaf,
    fact: "Over 10,000 species of fungi are known to cause plant diseases, but only about 100 are responsible for the majority of crop losses worldwide.",
  },
  {
    icon: TrendingUp,
    fact: "Global crop production must increase by 60% by 2050 to feed a projected population of 9.7 billion people — making disease management more critical than ever.",
  },
  {
    icon: Shield,
    fact: "The first line of defence against most plant diseases is the use of certified disease-free seeds and planting material, which can reduce initial infection rates by up to 90%.",
  },
  {
    icon: Beaker,
    fact: "Copper-based fungicides, first used in the 1880s as Bordeaux mixture, remain one of the most widely used treatments for bacterial and fungal crop diseases worldwide.",
  },
];

export default function Journal() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJournals = async () => {
      try {
        const data = await fetchJournals();
        setJournals(data.entries || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadJournals();
  }, []);

  const featured = journals.length > 0 ? journals[0] : null;
  const entries = journals.slice(1);

  return (
    <section className="bg-[#F7F7F4] px-8 py-16">
      <div className="mx-auto max-w-7xl">
        {/* ── Page Header ── */}
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
          Journal
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-6xl leading-none tracking-tight text-black sm:text-7xl">
          Notes from the field and the frontline of crop science.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6F6F6F]">
          Research-backed insights on plant diseases, sustainable agriculture,
          and the role of AI in protecting the world's food supply. Written for
          farmers, agronomists, and anyone who believes food security begins
          with healthy crops.
        </p>

        {loading ? (
          <div className="mt-14 py-20 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            <p className="mt-4 text-sm text-[#6F6F6F]">Loading latest research...</p>
          </div>
        ) : error ? (
          <div className="mt-14 rounded-2xl bg-red-50 p-8 text-center text-red-600">
            <p>Failed to load journals: {error}</p>
          </div>
        ) : (
          <>
            {/* ── Featured Article ── */}
            {featured && (
              <article className="mt-14 rounded-[2.5rem] bg-black p-8 text-white sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
                    {featured.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                    <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                    {featured.generatedDate}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                    <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                    {featured.readTime}
                  </span>
                </div>
                <h2 className="font-display mt-6 max-w-3xl text-4xl leading-none text-white sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/60">
                  {featured.summary}
                </p>
                <div className="mt-8 grid gap-5 lg:grid-cols-2">
                  {featured.body.split("\n\n").map((paragraph, index) => (
                    <p className="text-sm leading-7 text-white/70" key={index}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            )}

            {/* ── Article Grid ── */}
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry) => (
                <article
                  className="hairline-card group rounded-[2rem] bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
                  key={entry._id}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F4] px-3 py-1 text-[11px] font-medium text-[#6F6F6F]">
                      <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
                      {entry.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#6F6F6F]/60">
                      <CalendarDays aria-hidden="true" className="h-3 w-3" />
                      {entry.generatedDate}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#6F6F6F]/60">
                      <Clock aria-hidden="true" className="h-3 w-3" />
                      {entry.readTime}
                    </span>
                  </div>
                  <h2 className="font-display mt-5 text-2xl leading-tight text-black sm:text-3xl">
                    {entry.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-[#6F6F6F]">
                    {entry.summary}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-black/40 transition-colors duration-200 group-hover:text-black">
                    Read more
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ── Quick Facts ── */}
        <div className="mt-14">
          <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
            Did you know?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickFacts.map((item, index) => (
              <article
                className="hairline-card rounded-[2rem] bg-white p-6"
                key={index}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#6F6F6F]">
                  {item.fact}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="mt-14 rounded-[2rem] border border-black/8 bg-white p-8">
          <div className="flex items-start gap-3">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-black/40"
            />
            <div>
              <h3 className="font-display text-lg text-black">
                Editorial note
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#6F6F6F]">
                The information presented in these journal entries is compiled
                from peer-reviewed agricultural research, publications by the
                Food and Agriculture Organization (FAO), the International
                Centre for Agriculture and Biosciences (CABI), and established
                agricultural universities. While every effort is made to
                ensure accuracy, crop disease behaviour varies by region,
                climate, and cultivar. Always consult local agricultural
                extension services for region-specific guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
