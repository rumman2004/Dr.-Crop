import {
  AlertTriangle,
  ArrowRight,
  Beaker,
  BookOpen,
  Bug,
  CalendarDays,
  Clock,
  Droplets,
  FlaskConical,
  Globe,
  Leaf,
  Microscope,
  Shield,
  Sprout,
  Sun,
  Thermometer,
  TrendingUp,
  Wheat,
} from "lucide-react";

/* ── Featured article ── */
const featured = {
  tag: "Featured",
  date: "April 2025",
  readTime: "8 min read",
  title: "The Silent Epidemic: How Plant Diseases Threaten Global Food Security",
  summary:
    "Every year, plant diseases destroy enough food to feed 600 million people. As climate change accelerates the spread of pathogens into new regions, early detection has never been more critical.",
  body: [
    "The Food and Agriculture Organization (FAO) estimates that plant pests and diseases are responsible for the loss of up to 40% of global food crops annually — translating to roughly $220 billion in economic losses. For context, that figure exceeds the entire GDP of countries like Portugal or New Zealand.",
    "What makes plant diseases particularly devastating is their silent progression. Unlike drought or flooding, which are immediately visible, fungal infections, bacterial blights, and viral diseases often establish themselves weeks before symptoms become visible to the human eye. By the time a farmer notices yellowing leaves or unusual lesions, the pathogen may have already spread across the field.",
    "Climate change is compounding this challenge. Rising temperatures are expanding the geographic range of crop pathogens. A 2023 study published in Nature Climate Change found that plant diseases are migrating toward the poles at an average rate of 2.7 kilometres per year, introducing devastating pathogens to regions whose farmers have no prior experience managing them.",
    "This is precisely where AI-powered diagnostic tools become transformative. Computer vision models trained on millions of plant pathology images can detect disease patterns at a stage when intervention is still effective — often before symptoms are visible to the untrained eye. Dr. Crop embodies this approach: a structured, accessible diagnostic workflow that turns a simple photograph into actionable guidance.",
  ],
};

/* ── Main journal entries ── */
const entries = [
  {
    icon: Microscope,
    tag: "Research",
    date: "March 2025",
    readTime: "6 min read",
    title: "Understanding Fungal Pathogens: The Invisible Threat Below Ground",
    text: "Soil-borne fungal diseases like Fusarium wilt, Verticillium wilt, and Rhizoctonia root rot are among the most difficult crop diseases to manage because symptoms appear above ground long after the root system has been compromised. Fusarium oxysporum f. sp. cubense Tropical Race 4 (TR4) — commonly known as Panama disease — is currently threatening the $25 billion global banana industry with no effective chemical cure available. The pathogen persists in soil for decades, making crop rotation ineffective. Research institutions worldwide are racing to develop resistant banana cultivars, but the timeline remains uncertain. Understanding the biology of these soil-borne pathogens is essential for every farmer working with susceptible crops.",
  },
  {
    icon: Thermometer,
    tag: "Climate",
    date: "March 2025",
    readTime: "5 min read",
    title: "Climate Change and the Migration of Crop Diseases",
    text: "As global temperatures rise, crop pathogens are expanding into new territories. Wheat blast, a devastating disease caused by Magnaporthe oryzae pathotype Triticum, was historically confined to South America. In 2016, it appeared in Bangladesh, devastating 15,000 hectares of wheat. By 2023, cases were reported in Zambia and Mozambique. The International Maize and Wheat Improvement Center (CIMMYT) warns that wheat blast could spread to India's Indo-Gangetic Plain — the breadbasket of South Asia — within the next decade. Monitoring tools that enable rapid, field-level identification of emerging diseases are becoming essential infrastructure for agricultural resilience.",
  },
  {
    icon: Bug,
    tag: "Pest Management",
    date: "February 2025",
    readTime: "5 min read",
    title: "Integrated Pest Management: Moving Beyond Chemical Dependence",
    text: "The World Health Organization estimates 385 million cases of acute pesticide poisoning occur globally each year, with approximately 11,000 fatalities. Integrated Pest Management (IPM) offers a science-based alternative that combines biological control agents, crop rotation, resistant varieties, and targeted chemical application only as a last resort. Countries adopting IPM programmes have seen pesticide use reductions of 30–50% without compromising yields. The key enabler of effective IPM is accurate disease identification — knowing exactly what you're dealing with determines whether biological controls, cultural practices, or chemical intervention is appropriate.",
  },
  {
    icon: Wheat,
    tag: "Food Security",
    date: "February 2025",
    readTime: "7 min read",
    title: "Rust Diseases: The Most Feared Pathogens in Global Wheat Production",
    text: "Wheat rust — caused by Puccinia species — has been called the most dangerous plant disease on earth. The Ug99 strain of wheat stem rust, first detected in Uganda in 1999, carries virulence against the resistance gene Sr31, which protected wheat varieties worldwide for over three decades. Since its discovery, Ug99 lineage variants have been detected across 13 countries in Africa and the Middle East. The Borlaug Global Rust Initiative, coordinated by Cornell University, is working to develop and deploy resistant varieties, but the pathogen continues to evolve. Rust epidemics are estimated to threaten the food security of over one billion people who depend on wheat as a staple food.",
  },
  {
    icon: Droplets,
    tag: "Disease Biology",
    date: "January 2025",
    readTime: "5 min read",
    title: "Late Blight: The Disease That Changed History",
    text: "Phytophthora infestans — the pathogen responsible for late blight — caused the Irish Potato Famine of 1845–1852, killing approximately one million people and forcing another million to emigrate. Nearly two centuries later, late blight remains the single most costly disease of potato production, causing global losses exceeding $6.7 billion annually. The pathogen produces sporangia that can travel 10–15 kilometres through wind-driven rain, enabling explosive epidemics. Modern management relies on resistant cultivars, fungicide programmes, and early-warning systems — but accurate field-level identification remains the critical first step in effective response.",
  },
  {
    icon: Sun,
    tag: "Tropical Agriculture",
    date: "January 2025",
    readTime: "5 min read",
    title: "Citrus Greening: The Disease With No Cure",
    text: "Huanglongbing (HLB), commonly known as citrus greening, is considered the most destructive disease of citrus worldwide. Caused by the bacterium Candidatus Liberibacter asiaticus and spread by the Asian citrus psyllid, HLB has devastated citrus industries in Florida, Brazil, and across Southeast Asia. Infected trees produce small, misshapen, bitter fruit and typically decline within 3–5 years. Florida's citrus production has declined by over 75% since HLB was first detected in the state in 2005. No cure exists. Management focuses on psyllid control, removal of infected trees, and the development of tolerant rootstocks — an ongoing global research effort.",
  },
  {
    icon: Sprout,
    tag: "Sustainable Farming",
    date: "December 2024",
    readTime: "6 min read",
    title: "Cover Crops and Disease Suppression: Nature's First Defence",
    text: "Cover cropping — the practice of planting non-cash crops like clover, rye, or mustard between growing seasons — is emerging as a powerful tool for suppressing soil-borne plant diseases. Research published in the journal Plant Disease demonstrates that brassica cover crops (mustard, radish) release glucosinolates during decomposition, which break down into biofumigant compounds toxic to soil pathogens including Rhizoctonia solani, Fusarium spp., and Verticillium dahliae. A 2022 meta-analysis of 85 field trials found that cover cropping reduced the incidence of soil-borne diseases by an average of 28% while simultaneously improving soil organic matter and water retention.",
  },
  {
    icon: Globe,
    tag: "Global Impact",
    date: "December 2024",
    readTime: "4 min read",
    title: "Rice Blast: The Persistent Threat to Asia's Staple Crop",
    text: "Rice blast, caused by the fungus Magnaporthe oryzae, is the most important disease of rice globally, affecting production in over 85 countries. The disease can attack rice at every growth stage — from seedling to grain fill — causing yield losses ranging from 10% to 100% in severe cases. An estimated 60 million tonnes of rice are lost to blast annually — enough to feed 60 million people. The pathogen's remarkable genetic diversity allows it to rapidly overcome host resistance, with new virulent races emerging every few years. Effective management requires an integrated approach combining resistant varieties, balanced fertilisation (excess nitrogen increases susceptibility), and timely fungicide application based on accurate field diagnosis.",
  },
  {
    icon: FlaskConical,
    tag: "Innovation",
    date: "November 2024",
    readTime: "6 min read",
    title: "How Computer Vision is Revolutionising Plant Pathology",
    text: "Traditional plant disease diagnosis relies on visual inspection by trained pathologists — a process that is slow, subjective, and inaccessible to most smallholder farmers. Computer vision models, particularly Convolutional Neural Networks (CNNs) and Vision Transformers, are changing this landscape. A landmark 2019 study in Frontiers in Plant Science demonstrated that deep learning models achieved 99.35% accuracy in identifying 38 disease classes across 14 crop species using leaf images. More recent work with Google's Gemini and GPT-4 Vision models has shown that large multimodal AI systems can provide not just identification, but contextual explanations of disease progression, treatment options, and environmental conditions favouring the pathogen — the exact approach Dr. Crop implements.",
  },
];

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

        {/* ── Featured Article ── */}
        <article className="mt-14 rounded-[2.5rem] bg-black p-8 text-white sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <BookOpen aria-hidden="true" className="h-3.5 w-3.5" />
              {featured.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
              <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
              {featured.date}
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
            {featured.body.map((paragraph, index) => (
              <p
                className="text-sm leading-7 text-white/70"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* ── Article Grid ── */}
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <article
              className="hairline-card group rounded-[2rem] bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
              key={entry.title}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F7F4] px-3 py-1 text-[11px] font-medium text-[#6F6F6F]">
                  <entry.icon aria-hidden="true" className="h-3.5 w-3.5" />
                  {entry.tag}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#6F6F6F]/60">
                  <CalendarDays aria-hidden="true" className="h-3 w-3" />
                  {entry.date}
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
                {entry.text}
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
