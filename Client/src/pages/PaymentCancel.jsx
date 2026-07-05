import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function PaymentCancel() {
  return (
    <section className="bg-white px-6 py-20 sm:px-8 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F7F7F4]">
          <XCircle className="h-10 w-10 text-black" />
        </div>
        <h1 className="font-display text-4xl text-black">Payment Cancelled</h1>
        <p className="mt-4 text-[#6F6F6F]">
          You cancelled the checkout process. No charges were made to your account.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link to="/pricing">
            <Button className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Pricing
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
