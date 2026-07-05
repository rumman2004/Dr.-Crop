import { Menu, X, ScanLine } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Scan", to: "/studio" },
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/pricing" },
  { label: "Journal", to: "/journal" },
  { label: "Reach Us", to: "/reach" },
];

const linkClass = ({ isActive }) =>
  `px-2 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-[#000000]" : "text-[#6F6F6F] hover:text-[#000000]"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <NavLink
          className="font-display text-3xl tracking-tight text-[#000000]"
          to="/"
        >
          Dr. Crop<sup className="ml-0.5 text-xs align-super">®</sup>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink className={linkClass} key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <NavLink
            className="rounded-full bg-[#000000] px-6 py-2.5 flex items-center gap-2 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            to="/studio"
          >
            <ScanLine aria-hidden="true" className="h-5 w-5" />
            Scan Disease
          </NavLink>
          {token && user && (
            <div className="flex items-center gap-1 rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-[#6F6F6F]" title="Daily free credits">
              <span className="font-bold text-black">{user.credits !== undefined ? user.credits : 5}</span> Credits
            </div>
          )}
          {token ? (
            <button
              onClick={logout}
              className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000]"
            >
              Sign out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="text-sm font-medium text-[#6F6F6F] hover:text-[#000000]"
            >
              Sign in
            </NavLink>
          )}
        </div>

        <button
          aria-label="Toggle navigation"
          className="rounded-full border border-black/10 bg-white/70 p-2 text-black md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {isOpen ? (
            <X aria-hidden="true" className="h-6 w-6" />
          ) : (
            <Menu aria-hidden="true" className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-black/10 bg-white/95 px-8 py-4 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map((link) => (
              <NavLink
                className={linkClass}
                key={link.to}
                onClick={() => setIsOpen(false)}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              className="mt-2 rounded-full bg-black px-6 py-3 text-center text-sm font-medium text-white"
              onClick={() => setIsOpen(false)}
              to="/studio"
            >
              Scan Disease
            </NavLink>
            {token && user && (
              <div className="mt-2 text-center text-sm font-medium text-[#6F6F6F]">
                <span className="font-bold text-black">{user.credits !== undefined ? user.credits : 5}</span> Daily Credits left
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
