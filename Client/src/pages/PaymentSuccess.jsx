import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { verifyPaymentSession } from "../api/cropApi";

export default function PaymentSuccess() {
  const { refreshProfile } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("verifying"); // "verifying" | "done"

  useEffect(() => {
    let cancelled = false;

    const confirmPayment = async () => {
      try {
        // Verify the session with the server, which grants the credits.
        // This works without relying on the Stripe webhook.
        if (sessionId) {
          await verifyPaymentSession(sessionId);
        }
      } catch (err) {
        console.error("Failed to verify payment session", err);
      } finally {
        // Refresh the profile so the UI shows the new credit balance.
        await refreshProfile();
        if (!cancelled) setStatus("done");
      }
    };

    confirmPayment();

    return () => {
      cancelled = true;
    };
  }, [sessionId, refreshProfile]);

  return (
    <section className="bg-white px-6 py-20 sm:px-8 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F7F4]">
          {status === "verifying" ? (
            <Loader2 className="h-10 w-10 animate-spin text-black" />
          ) : (
            <CheckCircle2 className="h-10 w-10 text-black" />
          )}
        </div>
        <h1 className="font-display text-4xl text-black">
          {status === "verifying" ? "Confirming Payment…" : "Payment Successful!"}
        </h1>
        <p className="mt-4 text-[#6F6F6F]">
          {status === "verifying"
            ? "Please wait while we confirm your purchase and add your credits."
            : "Thank you for your purchase. Your credits have been added to your account."}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link to="/studio">
            <Button className="w-full" size="lg">
              Start Scanning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/">
            <Button className="w-full" variant="secondary" size="lg">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
