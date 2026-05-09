import { Mail, MapPin, MessageCircle } from "lucide-react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

export default function Reach() {
  return (
    <section className="bg-white px-8 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#6F6F6F]">
            Reach Us
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-6xl leading-none tracking-tight text-black sm:text-7xl">
            Let us hear what your fields are facing.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#6F6F6F]">
            Share feedback, deployment questions, or ideas for making the crop
            diagnosis workflow more useful.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-[#6F6F6F]">
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" className="h-5 w-5 text-black" />
              support@aethera.agri
            </p>
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="h-5 w-5 text-black" />
              Remote-first agricultural technology studio
            </p>
            <p className="flex items-center gap-3">
              <MessageCircle aria-hidden="true" className="h-5 w-5 text-black" />
              Response window: 24 to 48 hours
            </p>
          </div>
        </div>

        <Card className="glass-panel p-6 sm:p-8">
          <form
            className="grid gap-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <Input id="name" label="Name" placeholder="Your name" />
            <Input id="email" label="Email" placeholder="you@example.com" />
            <label className="block" htmlFor="message">
              <span className="mb-2 block text-sm font-medium text-black">
                Message
              </span>
              <textarea
                className="min-h-40 w-full rounded-[1.5rem] border border-black/10 bg-white px-4 py-4 text-sm text-black outline-none transition placeholder:text-[#6F6F6F] focus:border-black focus:ring-4 focus:ring-black/5"
                id="message"
                placeholder="Tell us what you want to improve."
              />
            </label>
            <Button type="submit">Send message</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
