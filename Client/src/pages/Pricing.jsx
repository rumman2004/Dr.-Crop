import { Loader2, Check } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createCheckoutSession } from "../api/cropApi";
import Button from "../components/ui/Button";

const packages = [
  {
    id: "starter",
    name: "Starter Top-Up",
    price: "₹49",
    credits: 50,
    features: [
      "50 AI Diagnoses",
      "No expiration date",
      "Immediate delivery",
    ],
  },
  {
    id: "basic",
    name: "Basic Top-Up",
    price: "₹99",
    credits: 120,
    features: [
      "120 AI Diagnoses",
      "No expiration date",
      "Immediate delivery",
    ],
  },
  {
    id: "pro",
    name: "Pro Top-Up",
    price: "₹199",
    credits: 250,
    popular: true,
    features: [
      "250 AI Diagnoses",
      "Best value for farmers",
      "No expiration date",
      "Immediate delivery",
    ],
  },
  {
    id: "max",
    name: "Max Top-Up",
    price: "₹499",
    credits: 800,
    features: [
      "800 AI Diagnoses",
      "Unlimited peace of mind",
      "No expiration date",
      "Immediate delivery",
    ],
  },
];

export default function Pricing() {
  const { token } = useAuth();
  const [loadingPkg, setLoadingPkg] = useState(null);
  const [error, setError] = useState("");

  const handlePurchase = async (packageId) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setLoadingPkg(packageId);
    setError("");

    try {
      const response = await createCheckoutSession(packageId);
      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error("Unable to start checkout session.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setLoadingPkg(null);
    }
  };

  return (
    <section className="bg-white px-6 py-20 sm:px-8 min-h-screen">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="font-display text-4xl leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-lg text-[#6F6F6F]">
          Purchase additional credits when you need them. No hidden fees.
        </p>

        {error && (
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 lg:grid-cols-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-8 text-left transition-transform hover:scale-[1.02] ${
                pkg.popular
                  ? "border-black bg-black text-white shadow-xl"
                  : "border-black/10 bg-white shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold uppercase tracking-wider text-black border border-black/10">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className={`text-xl font-medium ${pkg.popular ? "text-white" : "text-black"}`}>
                  {pkg.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`font-display text-5xl ${pkg.popular ? "text-white" : "text-black"}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-sm ${pkg.popular ? "text-white/70" : "text-[#6F6F6F]"}`}>
                    / {pkg.credits} credits
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check
                        className={`h-5 w-5 flex-shrink-0 ${
                          pkg.popular ? "text-white" : "text-black"
                        }`}
                      />
                      <span className={`text-sm ${pkg.popular ? "text-white/90" : "text-[#6F6F6F]"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`mt-10 w-full ${
                  pkg.popular
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white hover:bg-black/90"
                }`}
                onClick={() => handlePurchase(pkg.id)}
                disabled={loadingPkg === pkg.id}
                size="lg"
              >
                {loadingPkg === pkg.id ? (
                  <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin mx-auto" />
                ) : token ? (
                  "Buy Now"
                ) : (
                  "Sign in to buy"
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
