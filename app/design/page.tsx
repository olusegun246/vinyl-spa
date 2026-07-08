"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from "lucide-react";
import Reveal from "@/components/Reveal";

interface DesignTemplate {
  id: string;
  name: string;
  categoryName: string;
  specs: string;
}

// Single Templated embed used for all product categories.
const TEMPLATED_EMBED_URL =
  "https://app.templated.io/editor?embed=55032d73-62d0-476b-a239-5d9ec775c9d2";

const templates: DesignTemplate[] = [
  {
    id: "tshirt",
    name: "Custom T-Shirt",
    categoryName: "T-Shirt Template",
    specs: "Standard print area: 12\" x 16\" @ 300dpi",
  },
  {
    id: "banner",
    name: "Outdoor Banner",
    categoryName: "Banner Template",
    specs: "Aspect Ratio: 3:1 (Standard outdoor banner)",
  },
  {
    id: "window",
    name: "Window Graphics",
    categoryName: "Storefront Window Sign",
    specs: "Standard storefront window dimensions",
  },
  {
    id: "stickers",
    name: "Stickers & Decals",
    categoryName: "Die-Cut Sticker Sheet",
    specs: "Cutline padding: 0.125\" bleed margins",
  },
  {
    id: "merch",
    name: "Custom Merchandise",
    categoryName: "Promo Mug / Bottle Design",
    specs: "Cylindrical wrap design space: 8.5\" x 3.5\"",
  },
  {
    id: "org",
    name: "Organizational Shirts",
    categoryName: "Bulk Group Apparel",
    specs: "Perfect sizing across S to 3XL templates",
  },
];

function DesignWorkspaceContent() {
  const [activeTemplate, setActiveTemplate] = useState<DesignTemplate>(templates[0]);
  const searchParams = useSearchParams();
  const categoryParam = searchParams ? searchParams.get("category") : null;

  useEffect(() => {
    if (categoryParam) {
      const match = templates.find((t) => t.id === categoryParam);
      if (match) {
        setActiveTemplate(match);
      }
    }
  }, [categoryParam]);

  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Customer Contact Info states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("Personal");
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSelectFile(e.target.files[0]);
    }
  };

  const validateAndSelectFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are accepted for print-ready uploads.");
      return;
    }
    setFile(selectedFile);
    setFormError("");
    setSubmitSuccess(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format input as phone: (XXX) XXX-XXXX
    const raw = e.target.value.replace(/[^0-9]/g, "");
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3)}`;
    } else if (raw.length > 6) {
      formatted = `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6, 10)}`;
    }
    setPhone(formatted);
  };

  const handleSubmitDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
      setFormError("Please fill out all contact info fields.");
      return;
    }
    if (!file) {
      setFormError("Please upload your PDF design file.");
      return;
    }

    setFormError("");
    setSubmitting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 100);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("serviceTitle", activeTemplate.name);
      formData.append("slug", activeTemplate.id);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("occasion", occasion);

      const res = await fetch("/api/send-print", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      if (res.ok) {
        setProgress(100);
        setTimeout(() => {
          setSubmitting(false);
          setSubmitSuccess(true);
        }, 300);
      } else {
        const data = await res.json();
        setFormError(data.error || "There was an issue sending your file. Please try again.");
        setSubmitting(false);
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setFormError("Submission failed. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-10 pb-16 md:pt-12 md:pb-24 px-6 lg:px-12 bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] min-h-screen grid-bg relative overflow-hidden">
      {/* Top Header Ambient radial glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/4" />

      {/* Soft Brand Ambient radial glows (Starts below hero) */}
      <div className="absolute top-[480px] right-0 w-[700px] h-[700px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none translate-x-1/4" />
      <div className="absolute bottom-[200px] left-0 w-[600px] h-[600px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/4" />
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 2-Column Split Workspace Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Side: Heading, Steps & Editor (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <Reveal className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 leading-none">
                Design Your Own <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent font-black">Prints</span>
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Design online using Templated&apos;s embedded editor, or skip the builder and upload <strong>any print-ready PDF</strong> you already have to send it directly to our printing staff.
              </p>
            </Reveal>

            {/* Horizontal 2-Step Design Roadmap inside the left side */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Step 1 Card: Design Your Artwork */}
              <Reveal className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-md shadow-brand-blue/15 animate-pulse">
                  01
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">Design online</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Select your category on the right, design in the embedded editor below, and export your artwork.
                  </p>
                </div>
              </Reveal>

              {/* Step 2 Card: Export & Return */}
              <Reveal className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-cyan text-white flex items-center justify-center font-black text-xs flex-shrink-0 shadow-md shadow-brand-cyan/15">
                  02
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">Submit Any PDF</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Upload your exported design file, or any print-ready PDF from Photoshop, Illustrator, or another program on the right.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Templated embedded iframe Workspace (Always Visible) */}
            <Reveal key="editor-workspace" className="w-full space-y-3">
              <div className="flex items-center justify-between bg-slate-900 text-white px-5 py-3 rounded-t-2xl shadow-md border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                    Templated Embedded Editor: <span className="text-brand-cyan font-extrabold">{activeTemplate.name} Workspace</span>
                  </span>
                </div>
              </div>
              <div className="relative w-full h-[600px] rounded-b-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
                <iframe
                  src={TEMPLATED_EMBED_URL}
                  className="w-full h-full border-none"
                  allow="clipboard-write; clipboard-read"
                  title="Templated Design Editor"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Side: Video Player, Form, and Support Box (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Autoplay Printing Production Video */}
            <Reveal key="video-guide" className="w-full">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-950">
                <video
                  src="/Printing-Machine-Hero-3.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>

            {/* Print Submission Desk Form Card */}
            <Reveal className="bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 shadow-xl shadow-slate-100 text-left space-y-6 relative overflow-hidden">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Print Submission Desk</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Submit designs to our printing staff.</p>
              </div>

              {/* Step 1: Choose Product & Design */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">1</span>
                    Choose Product
                  </h4>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase">Required</span>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Service Category</label>
                  <select
                    value={activeTemplate.id}
                    onChange={(e) => {
                      const match = templates.find((t) => t.id === e.target.value);
                      if (match) {
                        setActiveTemplate(match);
                        setFile(null);
                        setSubmitSuccess(false);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-blue/50 transition-colors"
                  >
                    {templates.map((tpl) => (
                      <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 2: Drag & Drop PDF */}
              <div className="space-y-3 pt-5 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">2</span>
                    Upload PDF Design
                  </h4>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase">Required</span>
                </div>

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileInput}
                    className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                      dragActive
                        ? "border-brand-blue bg-brand-blue/5 scale-[0.99]"
                        : "border-slate-300 hover:border-brand-blue/40 bg-slate-50/50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <UploadCloud className="w-7 h-7 text-brand-blue/60 mb-2" />
                    <span className="text-xs font-semibold text-slate-800">Drag & Drop print PDF</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">or click to browse files</span>
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/50 flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-blue">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 text-left">
                          <div className="text-xs font-bold text-slate-800 truncate w-32 md:w-40">{file.name}</div>
                          <div className="text-[9px] text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setFile(null); setSubmitSuccess(false); }}
                        className="text-[10px] font-semibold text-rose-500 hover:underline px-2 py-1"
                        disabled={submitting}
                      >
                        Remove
                      </button>
                    </div>

                    {submitting ? (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400">
                          <span>Submitting...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-blue transition-all duration-150" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    ) : submitSuccess ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 text-left">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>File Selected & Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue text-left">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>PDF Loaded - Ready to Submit</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Step 3: Contact Info Submission Form */}
              <div className="space-y-4 pt-5 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-extrabold text-[9px]">3</span>
                    Contact Info
                  </h4>
                </div>

                {submitSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col items-center text-center space-y-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div className="text-left w-full space-y-1">
                      <h4 className="font-bold text-emerald-800 text-xs text-center">Design Submitted Successfully!</h4>
                      <p className="text-[10px] text-emerald-700 leading-relaxed text-center">
                        Your print-ready PDF has been sent to our production email. We will review your file specs and text/call you at <span className="font-bold">{phone}</span> to finalize your order details.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitDesign} className="space-y-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">First Name</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Last Name</label>
                          <input
                            type="text"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                          placeholder="(346) 218-0615"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john.doe@example.com"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1 text-left">Occasion</label>
                        <select
                          value={occasion}
                          onChange={(e) => setOccasion(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-blue/50 transition-colors"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Business / Corporate">Business / Corporate</option>
                          <option value="Birthday / Party">Birthday / Party</option>
                          <option value="School / Team Sports">School / Team Sports</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {formError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-[10px] font-medium flex items-start gap-1.5 text-left">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue/95 transition-all shadow-md shadow-brand-blue/15 hover:shadow-lg flex items-center justify-center gap-1.5 hover:scale-[1.01] duration-300 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none cursor-pointer border-none"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting Design...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          Submit Design File
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Support Box */}
            <Reveal className="bg-white/80 border border-slate-200/80 rounded-3xl p-5 text-left flex items-start gap-3 shadow-sm backdrop-blur-sm">
              <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
              <div className="text-[11px] space-y-1">
                <h4 className="font-bold text-slate-900">Need assistance?</h4>
                <p className="text-slate-600 leading-relaxed">
                  Call our team at <strong>346-218-0615</strong> or email us at <strong>VinylSupplyMore@gmail.com</strong> for manual setup.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DesignPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center bg-paper-cool">
        <div className="w-8 h-8 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DesignWorkspaceContent />
    </Suspense>
  );
}