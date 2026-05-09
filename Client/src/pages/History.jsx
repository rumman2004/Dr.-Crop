import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  Clock,
  FileSearch,
  Filter,
  Leaf,
  Loader2,
  RefreshCcw,
  ScanLine,
  Search,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import { fetchScanHistory } from "../api/cropApi";
import AnalysisResult from "../components/analysis/AnalysisResult";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

/* ── Date formatter ── */
const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

const formatRelative = (value) => {
  const now = new Date();
  const date = new Date(value);
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHr < 24) return `${diffHr} hr ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  return formatDate(value);
};

/* ── Risk badge styling ── */
const riskStyles = {
  high: "bg-black text-white",
  medium: "bg-[#F5F5F2] text-black",
  low: "bg-white text-black ring-1 ring-black/10",
};

const getRiskClass = (risk) => {
  const key = (risk || "").toLowerCase();
  return riskStyles[key] || riskStyles.low;
};

export default function History() {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pageRef = useRef(null);

  const loadHistory = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetchScanHistory(50);
      setScans(response.scans || []);
      setSelectedScan(response.scans?.[0] || null);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadInitialHistory = async () => {
      try {
        const response = await fetchScanHistory(50);

        if (ignore) {
          return;
        }

        setScans(response.scans || []);
        setSelectedScan(response.scans?.[0] || null);
      } catch (requestError) {
        if (!ignore) {
          setError(requestError.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadInitialHistory();

    return () => {
      ignore = true;
    };
  }, []);

  /* ── GSAP entrance ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-history-header]", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from("[data-history-content]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* ── Filtered scans ── */
  const filteredScans = searchTerm
    ? scans.filter(
        (scan) =>
          (scan.diseaseName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (scan.cropName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      )
    : scans;

  /* ── Stats computed from scans ── */
  const totalScans = scans.length;
  const uniqueDiseases = new Set(
    scans.map((s) => s.diseaseName).filter(Boolean),
  ).size;
  const uniqueCrops = new Set(
    scans.map((s) => s.cropName).filter(Boolean),
  ).size;

  return (
    <section className="min-h-screen bg-[#F7F7F4] px-6 py-12 sm:px-8" ref={pageRef}>
      <div className="mx-auto max-w-7xl">
        {/* ── Header ── */}
        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          data-history-header
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
              Diagnosis records
            </p>
            <h1 className="font-display mt-3 text-5xl leading-none tracking-tight text-black sm:text-6xl lg:text-7xl">
              Scan history
            </h1>
            <p className="mt-3 max-w-lg text-base leading-7 text-[#6F6F6F]">
              Every diagnosis is archived here. Track disease patterns,
              compare results across dates, and build a seasonal health
              record for your crops.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black transition hover:border-black hover:bg-black hover:text-white"
              to="/studio"
            >
              <ScanLine aria-hidden="true" className="h-4 w-4" />
              New scan
            </Link>
            <Button
              disabled={isLoading}
              onClick={loadHistory}
              variant="secondary"
            >
              <RefreshCcw
                aria-hidden="true"
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* ── Quick stats bar ── */}
        {!isLoading && scans.length > 0 && (
          <div
            className="mt-8 grid grid-cols-3 gap-3"
            data-history-content
          >
            <div className="rounded-2xl border border-black/8 bg-white px-5 py-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#6F6F6F]">
                <FileSearch
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-black/40"
                />
                Total scans
              </div>
              <p className="font-display mt-1 text-3xl text-black">
                {totalScans}
              </p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white px-5 py-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#6F6F6F]">
                <AlertTriangle
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-black/40"
                />
                Diseases found
              </div>
              <p className="font-display mt-1 text-3xl text-black">
                {uniqueDiseases}
              </p>
            </div>
            <div className="rounded-2xl border border-black/8 bg-white px-5 py-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#6F6F6F]">
                <Leaf
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-black/40"
                />
                Crops scanned
              </div>
              <p className="font-display mt-1 text-3xl text-black">
                {uniqueCrops}
              </p>
            </div>
          </div>
        )}

        {/* ── Loading state ── */}
        {isLoading && (
          <div className="mt-16 flex flex-col items-center justify-center gap-4 py-20">
            <Loader2
              aria-hidden="true"
              className="h-8 w-8 animate-spin text-black/30"
            />
            <p className="text-sm text-[#6F6F6F]">
              Loading your scan history...
            </p>
          </div>
        )}

        {/* ── Error state ── */}
        {error && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-5">
            <AlertTriangle
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-black/40"
            />
            <div>
              <p className="text-sm font-medium text-black">
                Failed to load scan history
              </p>
              <p className="mt-1 text-sm text-[#6F6F6F]">{error}</p>
              <Button
                className="mt-3"
                onClick={loadHistory}
                size="sm"
                variant="secondary"
              >
                <RefreshCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Try again
              </Button>
            </div>
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !error && scans.length === 0 && (
          <div className="mt-12" data-history-content>
            <Card className="mx-auto max-w-xl p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F7F4]">
                <Clock
                  aria-hidden="true"
                  className="h-8 w-8 text-black/30"
                />
              </div>
              <h2 className="font-display mt-6 text-4xl text-black">
                No scans yet
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#6F6F6F]">
                Your diagnosis history will appear here after your first scan.
                Each record includes the disease identified, symptoms,
                treatment recommendations, and the original photograph —
                creating a health timeline for your crops.
              </p>
              <Link
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
                to="/studio"
              >
                <ScanLine aria-hidden="true" className="h-4 w-4" />
                Start your first scan
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>

              {/* Helpful tips in empty state */}
              <div className="mt-10 grid gap-3 text-left sm:grid-cols-2">
                <div className="rounded-xl bg-[#F7F7F4] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-black">
                    <TrendingUp
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                    Track patterns
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-[#6F6F6F]">
                    Scanning the same field across weeks reveals whether
                    diseases are progressing or responding to treatment.
                  </p>
                </div>
                <div className="rounded-xl bg-[#F7F7F4] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-black">
                    <FileSearch
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                    />
                    Compare results
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-[#6F6F6F]">
                    Select any past scan to view its full diagnosis report —
                    symptoms, causes, treatment, and prevention.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ── Scan list + detail ── */}
        {scans.length > 0 && (
          <div className="mt-8" data-history-content>
            {/* Search bar */}
            <div className="mb-5 flex items-center gap-3">
              <div className="relative flex-1 sm:max-w-xs">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F6F6F]/50"
                />
                <input
                  className="h-11 w-full rounded-full border border-black/10 bg-white pl-10 pr-4 text-sm text-black outline-none transition placeholder:text-[#6F6F6F]/50 focus:border-black focus:ring-4 focus:ring-black/5"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by disease or crop name..."
                  type="text"
                  value={searchTerm}
                />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6F6F6F]">
                <Filter
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-black/30"
                />
                {filteredScans.length} of {scans.length} records
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              {/* ── Scan list ── */}
              <div className="grid gap-2.5 lg:max-h-[75vh] lg:overflow-auto lg:pr-2">
                {filteredScans.length === 0 && (
                  <div className="rounded-2xl border border-black/8 bg-white p-6 text-center">
                    <p className="text-sm text-[#6F6F6F]">
                      No scans match "{searchTerm}"
                    </p>
                  </div>
                )}
                {filteredScans.map((scan) => {
                  const isSelected = selectedScan?._id === scan._id;
                  const risk = scan.rawAnalysis?.riskLevel || scan.riskLevel;

                  return (
                    <button
                      className={`group rounded-2xl border bg-white p-4 text-left transition-all hover:border-black/30 ${
                        isSelected
                          ? "border-black ring-4 ring-black/5"
                          : "border-black/8"
                      }`}
                      key={scan._id}
                      onClick={() => setSelectedScan(scan)}
                      type="button"
                    >
                      <div className="flex gap-4">
                        {scan.imageUrl ? (
                          <img
                            alt="Crop scan"
                            className="h-20 w-24 flex-shrink-0 rounded-xl object-cover"
                            src={scan.imageUrl}
                          />
                        ) : (
                          <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-[#F7F7F4]">
                            <Leaf
                              aria-hidden="true"
                              className="h-6 w-6 text-black/15"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h2 className="truncate text-sm font-semibold text-black">
                              {scan.diseaseName || "Unknown Disease"}
                            </h2>
                            {risk && (
                              <span
                                className={`flex-shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${getRiskClass(risk)}`}
                              >
                                {risk}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-[#6F6F6F]">
                            {scan.cropName || "Unknown crop"}
                          </p>
                          <div className="mt-2 flex items-center gap-3">
                            <p className="flex items-center gap-1 text-[11px] text-[#6F6F6F]/70">
                              <CalendarDays
                                aria-hidden="true"
                                className="h-3 w-3"
                              />
                              {formatDate(scan.createdAt)}
                            </p>
                            <p className="text-[11px] text-[#6F6F6F]/50">
                              {formatRelative(scan.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <div
                        className={`mt-2 flex items-center gap-1 text-[11px] font-medium transition-colors ${
                          isSelected
                            ? "text-black"
                            : "text-[#6F6F6F]/30 group-hover:text-[#6F6F6F]"
                        }`}
                      >
                        {isSelected ? "Viewing report" : "View report"}
                        <ChevronLeft
                          aria-hidden="true"
                          className="h-3 w-3 rotate-180"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ── Detail panel ── */}
              {selectedScan && (
                <div className="lg:sticky lg:top-24 lg:max-h-[85vh] lg:overflow-auto">
                  <AnalysisResult
                    analysis={selectedScan.rawAnalysis || selectedScan}
                    scan={selectedScan}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
