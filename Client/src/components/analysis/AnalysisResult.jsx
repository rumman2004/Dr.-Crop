import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Microscope,
  ShieldCheck,
  Sprout,
} from "lucide-react";

import Card from "../ui/Card";

const ListBlock = ({ title, items = [], icon: Icon }) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className="rounded-[1.5rem] bg-[#F7F7F4] p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-black">
        {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
        {title}
      </div>
      <ul className="space-y-2 text-sm leading-6 text-[#6F6F6F]">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <CheckCircle2
              aria-hidden="true"
              className="mt-1 h-4 w-4 flex-none text-black"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function AnalysisResult({ analysis, scan, compact = false }) {
  if (!analysis) {
    return null;
  }

  const treatment = analysis.treatment || {};
  const risk = analysis.riskLevel || "Unknown";
  const riskClass =
    risk.toLowerCase() === "high"
      ? "bg-black text-white"
      : risk.toLowerCase() === "medium"
        ? "bg-[#F5F5F2] text-black"
        : "bg-white text-black ring-1 ring-black/10";

  return (
    <Card className={compact ? "p-4" : "overflow-hidden"}>
      {!compact && (
        <div className="border-b border-black/10 bg-[#F7F7F4] p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
                Diagnosis
              </p>
              <h2 className="font-display mt-2 text-5xl leading-none text-black">
                {analysis.diseaseName}
              </h2>
              <p className="mt-3 text-sm text-[#6F6F6F]">
                Crop: {analysis.cropName}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-sm font-bold ${riskClass}`}
              >
                {risk} risk
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-black ring-1 ring-black/10">
                {analysis.confidence} confidence
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={compact ? "" : "p-5"}>
        {scan?.imageUrl && !compact && (
          <img
            alt="Uploaded crop"
            className="mb-5 h-72 w-full rounded-[1.5rem] object-cover"
            src={scan.imageUrl}
          />
        )}

        <div className="rounded-[1.5rem] bg-[#F5F5F2] p-5 text-sm leading-6 text-[#4A4A4A]">
          <div className="mb-2 flex items-center gap-2 font-bold">
            <Microscope aria-hidden="true" className="h-4 w-4" />
            Field note
          </div>
          {analysis.summary ||
            "The AI returned a diagnosis, but no summary was provided."}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <ListBlock
            icon={Activity}
            items={analysis.symptoms}
            title="Visible symptoms"
          />
          <ListBlock
            icon={AlertTriangle}
            items={analysis.causes}
            title="Likely causes"
          />
          <ListBlock
            icon={ClipboardList}
            items={treatment.immediate}
            title="Immediate actions"
          />
          <ListBlock
            icon={Sprout}
            items={treatment.organic}
            title="Organic options"
          />
          <ListBlock
            icon={ShieldCheck}
            items={treatment.cultural}
            title="Field management"
          />
          <ListBlock
            icon={AlertTriangle}
            items={treatment.chemical}
            title="Chemical guidance"
          />
          <ListBlock
            icon={ShieldCheck}
            items={analysis.prevention}
            title="Prevention"
          />
          <ListBlock
            icon={ClipboardList}
            items={analysis.nextSteps}
            title="Next steps"
          />
        </div>

        {!compact && (
          <p className="mt-5 rounded-[1.5rem] border border-black/10 bg-white p-5 text-sm leading-6 text-[#6F6F6F]">
            {analysis.disclaimer}
          </p>
        )}
      </div>
    </Card>
  );
}
