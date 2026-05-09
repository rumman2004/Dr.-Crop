import {
  AlertTriangle,
  BookOpen,
  Eye,
  Globe,
  Heart,
  Leaf,
  Scale,
  Shield,
  Sprout,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

/* ── Global crop-loss statistics (FAO & CABI sourced) ── */
const globalStats = [
  {
    figure: "40%",
    label: "of global crop production is lost to plant pests and diseases every year",
    source: "FAO, 2023",
  },
  {
    figure: "$220B",
    label: "annual economic loss from plant diseases worldwide",
    source: "CABI, 2022",
  },
  {
    figure: "800M+",
    label: "people suffer from hunger, worsened by preventable crop disease",
    source: "UN World Food Programme",
  },
  {
    figure: "80%",
    label: "of the world's food is produced by 500 million smallholder farms",
    source: "IFAD, 2023",
  },
];

/* ── How Dr. Crop works ── */
const howItWorks = [
  {
    step: "01",
    icon: Eye,
    title: "Capture",
    text: "Take a clear photograph of the affected leaf, stem, or fruit. Natural daylight and a steady angle produce the best results.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Analyse",
    text: "Our AI engine examines visual patterns — discolouration, lesion shape, mould texture, wilting behaviour — and cross-references them against thousands of documented crop pathologies.",
  },
  {
    step: "03",
    icon: BookOpen,
    title: "Report",
    text: "You receive a structured diagnosis covering the likely disease, observable symptoms, probable causes, recommended treatment paths, and long-term prevention strategies.",
  },
  {
    step: "04",
    icon: Shield,
    title: "Archive",
    text: "Every scan is securely archived with its image and report so you can track disease patterns across seasons and fields.",
  },
];

/* ── Core principles ── */
const principles = [
  {
    icon: Target,
    title: "Precision First",
    text: "Early and accurate identification of crop disease can reduce pesticide overuse by up to 50% and save entire harvests. Dr. Crop is built to give farmers actionable clarity — not vague guesses.",
  },
  {
    icon: Users,
    title: "Built for Farmers",
    text: "We design every screen for the people who will use it in the field — on a phone, in sunlight, with muddy hands. No jargon, no clutter. Just the information that matters.",
  },
  {
    icon: Globe,
    title: "Globally Relevant",
    text: "Crop diseases like Late Blight, Bacterial Leaf Blight, Powdery Mildew, and Citrus Canker affect farms on every continent. Dr. Crop draws from a global knowledge base to support diverse agricultural conditions.",
  },
  {
    icon: Leaf,
    title: "Sustainability-Driven",
    text: "By promoting Integrated Pest Management (IPM) principles and reducing unnecessary chemical applications, every diagnosis nudges farming practices toward sustainability.",
  },
];

/* ── Common crop diseases ── */
const diseases = [
  {
    name: "Late Blight",
    crop: "Potato & Tomato",
    info: "Caused by Phytophthora infestans, late blight was responsible for the Irish Potato Famine in the 1840s. It still costs global potato production over $6 billion annually. Symptoms include dark, water-soaked lesions on leaves that rapidly turn brown with white mould on the undersurface.",
  },
  {
    name: "Bacterial Leaf Blight",
    crop: "Rice",
    info: "Caused by Xanthomonas oryzae, this disease can reduce rice yields by up to 70% in severe outbreaks. It is one of the most destructive rice diseases in Asia and Africa, appearing as water-soaked to yellowish stripes on leaf blades.",
  },
  {
    name: "Powdery Mildew",
    crop: "Wheat, Grapes & Cucurbits",
    info: "A widespread fungal disease caused by Erysiphales species that produces a characteristic white powdery coating on leaf surfaces. It thrives in warm, dry climates with cool nights and can reduce grain yields by 20–40%.",
  },
  {
    name: "Citrus Canker",
    crop: "Citrus Fruits",
    info: "Caused by Xanthomonas citri, citrus canker produces raised, crater-like lesions on leaves, stems, and fruit. It spreads rapidly through wind-driven rain and has led to the destruction of millions of citrus trees in Florida and Brazil.",
  },
  {
    name: "Fusarium Wilt",
    crop: "Banana, Tomato & Cotton",
    info: "A devastating soil-borne fungal disease caused by Fusarium oxysporum. The Panama disease strain (Tropical Race 4) currently threatens global banana production, with no effective chemical control available.",
  },
  {
    name: "Rust Diseases",
    crop: "Wheat, Coffee & Soybean",
    info: "Rust fungi (Puccinia spp.) produce characteristic orange-brown pustules on leaves. Wheat stem rust (Ug99) has been called the most feared crop disease on earth, capable of devastating entire wheat harvests across continents.",
  },
];

export default function About() {
  return (
    <section className="bg-white px-8 py-16">
      <div className="mx-auto max-w-7xl">
        {/* ── Hero / Mission ── */}
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            About
          </p>
          <h1 className="font-display mt-4 text-6xl leading-none tracking-tight text-black sm:text-7xl">
            Turning crop images into structured, life-saving guidance.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#6F6F6F]">
            Dr. Crop is an AI-powered crop disease diagnosis platform designed
            for farmers, agronomists, and agricultural researchers. Upload a
            photograph of an affected plant, and receive a comprehensive,
            structured report — covering the likely disease, visible symptoms,
            underlying causes, evidence-based treatment options, and long-term
            prevention strategies. Every diagnosis is archived so you can track
            disease patterns across seasons and make informed decisions about
            your fields.
          </p>
        </div>

        {/* ── Why It Matters — Global Statistics ── */}
        <div className="mt-16">
          <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
            Why early detection matters
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6F6F6F]">
            Plant diseases are one of the greatest threats to global food
            security. According to the Food and Agriculture Organization (FAO),
            plant pests and diseases are responsible for the loss of up to 40%
            of food crops globally each year. For smallholder farmers in
            developing nations — who produce nearly 80% of the world's food
            supply — a single undetected outbreak can mean the difference
            between a productive harvest and financial ruin.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {globalStats.map((stat) => (
              <article
                className="hairline-card rounded-[2rem] p-6 text-center"
                key={stat.figure}
              >
                <p className="font-display text-5xl text-black">
                  {stat.figure}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#6F6F6F]">
                  {stat.label}
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-black/30">
                  {stat.source}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── How Dr. Crop Works ── */}
        <div className="mt-16">
          <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
            How it works
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6F6F6F]">
            A four-step workflow designed to deliver clarity in minutes — from
            field photograph to structured diagnosis.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <article
                className="hairline-card rounded-[2rem] p-6"
                key={item.step}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                    <item.icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <span className="font-display text-lg text-black/20">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-3xl text-black">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#6F6F6F]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Core Principles ── */}
        <div className="mt-16">
          <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
            Core principles
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {principles.map((item) => (
              <article
                className="hairline-card rounded-[2rem] p-8"
                key={item.title}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-5 text-3xl text-black">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Common Crop Diseases ── */}
        <div className="mt-16">
          <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
            Diseases we help identify
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6F6F6F]">
            Dr. Crop's AI is trained to recognise a wide range of plant
            pathologies. Below are some of the most common and economically
            significant crop diseases encountered worldwide.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {diseases.map((disease) => (
              <article
                className="hairline-card rounded-[2rem] p-6"
                key={disease.name}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#F7F7F4] px-3 py-1 text-xs font-medium text-[#6F6F6F]">
                    {disease.crop}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-2xl text-black">
                  {disease.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
                  {disease.info}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ── Impact of AI in Agriculture ── */}
        <div className="mt-16 rounded-[2.5rem] bg-[#F7F7F4] p-8 sm:p-10">
          <div className="flex items-center gap-3">
            <TrendingUp
              aria-hidden="true"
              className="h-6 w-6 text-black"
            />
            <h2 className="font-display text-4xl leading-none text-black sm:text-5xl">
              AI in modern agriculture
            </h2>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="text-sm leading-7 text-[#6F6F6F]">
              <p>
                The integration of artificial intelligence in agriculture
                represents one of the most significant technological shifts of
                the 21st century. Computer vision models — the same class of
                technology powering Dr. Crop — have demonstrated the ability to
                identify plant diseases with accuracy rates exceeding 95% in
                controlled studies, rivalling expert plant pathologists.
              </p>
              <p className="mt-4">
                According to a report by Markets and Markets, the AI in
                agriculture market is projected to grow from $1.7 billion in
                2023 to $4.7 billion by 2028, driven by increasing demand for
                crop monitoring, predictive analytics, and automated disease
                detection. Satellite imagery, drone surveillance, and
                smartphone-based diagnosis tools are converging to create a new
                era of precision agriculture.
              </p>
            </div>
            <div className="text-sm leading-7 text-[#6F6F6F]">
              <p>
                For smallholder farmers who lack access to agricultural
                extension services, AI-powered diagnostic tools bridge a
                critical knowledge gap. The International Telecommunication
                Union (ITU) reports that over 3.4 billion people in rural areas
                now have access to mobile broadband — making smartphone-based
                crop diagnosis increasingly viable even in remote farming
                communities.
              </p>
              <p className="mt-4">
                Dr. Crop builds on this foundation by delivering structured,
                actionable diagnosis reports that go beyond simple disease
                identification. Each report covers observable symptoms, the
                underlying biological causes, evidence-based treatment
                recommendations, and preventive measures — empowering farmers
                with the contextual understanding they need to protect their
                livelihoods.
              </p>
            </div>
          </div>
        </div>

        {/* ── Our Vision ── */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          <article className="hairline-card rounded-[2rem] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
              <Heart aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-5 text-3xl text-black">
              Accessible
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
              We believe every farmer, regardless of location or economic
              background, deserves access to accurate crop health diagnostics.
              Dr. Crop is designed to work on any device with a camera and an
              internet connection.
            </p>
          </article>
          <article className="hairline-card rounded-[2rem] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
              <Scale aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-5 text-3xl text-black">
              Transparent
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
              AI should explain, not just predict. Every Dr. Crop diagnosis
              includes the reasoning behind the identification, the confidence
              indicators, and explicit limitations — so you always know what
              the AI saw and where its certainty ends.
            </p>
          </article>
          <article className="hairline-card rounded-[2rem] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
              <Sprout aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="font-display mt-5 text-3xl text-black">
              Evolving
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#6F6F6F]">
              Crop diseases mutate and adapt. So does Dr. Crop. Our diagnostic
              models are continually refined with new pathological research,
              emerging disease strains, and real-world field feedback to stay
              ahead of the threats facing modern agriculture.
            </p>
          </article>
        </div>

        {/* ── Safety Boundary ── */}
        <div className="mt-16 rounded-[2.5rem] bg-black p-8 text-white sm:p-10">
          <div className="flex items-center gap-3">
            <AlertTriangle aria-hidden="true" className="h-6 w-6" />
            <h2 className="font-display text-5xl leading-none">
              Safety boundary
            </h2>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-white/70">
            AI-powered crop diagnosis is a powerful early-warning tool, but it
            is not a replacement for professional agricultural consultation.
            Accuracy can be affected by image quality, lighting conditions,
            symptom overlap between diseases, the presence of multiple
            concurrent infections, and environmental stress factors that mimic
            disease symptoms. Always use Dr. Crop's output as preliminary
            guidance and confirm critical decisions — especially those
            involving pesticide application, quarantine measures, or the
            destruction of infected crops — with a qualified agronomist,
            agricultural extension officer, or local plant protection
            authority.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-white/70">
            The World Health Organization estimates that approximately 385
            million cases of acute pesticide poisoning occur annually, many
            resulting from incorrect application. Responsible, informed
            decision-making saves both crops and lives.
          </p>
        </div>
      </div>
    </section>
  );
}
