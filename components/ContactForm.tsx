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
  // To actually receive messages, POST the form data to:
  //   - a Next.js Route Handler (app/api/contact/route.ts), or
  //   - a form service like Formspree / Resend / Web3Forms.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    setTimeout(() => setSent(false), 4000);
  }

  const inputClass =
    "form-input w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink transition-all";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50/50 border border-gray-100 rounded-3xl p-8 md:p-10 space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name</label>
          <input id="firstName" name="firstName" type="text" required className={inputClass} placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name</label>
          <input id="lastName" name="lastName" type="text" required className={inputClass} placeholder="Doe" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
        <input id="email" name="email" type="email" required className={inputClass} placeholder="john@example.com" />
      </div>
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium mb-2">Project Type</label>
        <select id="projectType" name="projectType" className={inputClass}>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${inputClass} resize-none`}
          placeholder="Tell us about your project..."
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-ink text-white font-medium rounded-xl hover:bg-gray-800 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        Send Message
        <Send className="w-4 h-4" />
      </button>
      {sent && (
        <div className="flex items-center gap-2 text-green-600 text-sm font-medium p-3 bg-green-50 rounded-xl">
          <CheckCircle className="w-5 h-5" />
          <span>Message sent! We&apos;ll get back to you within 24 hours.</span>
        </div>
      )}
    </form>
  );
}
