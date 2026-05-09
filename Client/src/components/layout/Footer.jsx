import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-8 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="font-display text-4xl tracking-tight">
            Dr. Crop<sup className="ml-0.5 text-xs align-super">®</sup>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#6F6F6F]">
            A quiet agricultural intelligence interface for image-led diagnosis,
            saved field records, and thoughtful treatment guidance.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-black">
            Explore
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-[#6F6F6F]">
            <Link to="/studio">Studio</Link>
            <Link to="/history">Scan history</Link>
            <Link to="/about">About</Link>
            <Link to="/journal">Journal</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-black">
            Contact
          </h3>
          <Link
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/10 px-5 py-3 text-sm font-medium transition hover:border-black hover:bg-black hover:text-white"
            to="/reach"
          >
            Reach Us
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
