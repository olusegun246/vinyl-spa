"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

const projectTypes = [
  "Banner Printing",
  "Vehicle Wraps",
  "Apparel Printing",
  "Decals & Stickers",
  "Event Signage",
  "Other",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // NOTE: this currently simulates a submission.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  }

  const inputClass =
    "form-input w-full px-4 py-3 bg-white border border-border-medium rounded-xl focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-border-subtle rounded-3xl p-8 md:p-10 space-y-6 shadow-xl shadow-ink/5"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">First Name</label>
          <input id="firstName" name="firstName" type="text" required className={inputClass} placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">Last Name</label>
          <input id="lastName" name="lastName" type="text" required className={inputClass} placeholder="Doe" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">Email Address</label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="projectType" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">Project Type</label>
        <select id="projectType" name="projectType" className={inputClass}>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-2">Message Details</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your custom vinyl printing project..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue/90 shadow-md shadow-brand-blue/10 hover:shadow-lg hover:shadow-brand-blue/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 duration-300"
      >
        Send Inquiry
        <Send className="w-4 h-4" />
      </button>
      {sent && (
        <div className="flex items-center gap-2 text-brand-emerald text-sm font-semibold p-3 bg-brand-emerald/5 border border-brand-emerald/10 rounded-xl">
          <CheckCircle className="w-5 h-5" />
          <span>Inquiry received! We&apos;ll contact you within 24 hours.</span>
        </div>
      )}
    </form>
  );
}
